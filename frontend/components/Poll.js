import { useContext } from "react"
import { Radio, Button, Tooltip } from "react-daisyui"
import Link from "next/link"

import AuthContext from "../contexts/auth"

import Box from "../components/Box"
import Input from "../components/Input"

const Poll = ({ poll, radio, setRadio, vote, edit, setEdit, editPoll, deletePoll }) => {
  const { user } = useContext(AuthContext)

  return (
    <Box>
      <h1 className='font-bold text-xl uppercase mb-0.5'>{poll.title}</h1>
      <p className='text-base-content/70 text-sm mb-2'>
        <Link href={`/profile/${poll?.creator.name}`}>
          <a>{poll?.creator.name} </a>
        </Link>
        &#8226; 
        {poll.publicationDate.toLocaleTimeString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className='text-sm mb-4'>{poll.description}</p>
      {!poll.choices.some(choice => choice.voters.some(vote => vote.id === user?.id)) && poll.creator.id !== user?.id
        ? <>
            <div className="flex flex-col gap-y-3 mb-4">
              {poll.choices.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map(choice => (
                <div key={choice.id} className="flex items-center hover:cursor-pointer hover:text-base-content/70 w-fit" onClick={() => setRadio({ id: poll.id, selected: choice.id })}>
                  <Radio name={poll.id} checked={radio?.id === poll.id && radio.selected === choice.id} readOnly />
                  <p className='ml-2'>{choice.name}</p>
                </div>
              ))}
            </div>
            <Button size='sm' color='primary' disabled={radio?.id !== poll.id} onClick={vote}>Zagłosuj</Button>
          </>
        : <>
            <div className='flex flex-col gap-y-2 mb-4'>
              {poll.choices.map(choice => (
                <div key={choice.id} className="flex justify-between">
                  {(!edit?.edit || edit.id !== poll.id)  
                    ? <>
                      <div className="w-3/4 bg-base-300 rounded-full relative">
                        {Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100) > 0 
                        && <div 
                            className="bg-primary text-sm rounded-full h-full" 
                            style={{ width: `${Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100)}%` }}
                          ></div>
                        }
                        <Tooltip color='accent' position="right" className='ml-1 absolute top-0 text-base-100' message={choice.voters.length}>
                          {Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100)}%
                        </Tooltip>
                      </div>
                      <p>{choice.name}</p>
                    </>
                    : <p 
                        className={`mt-1 hover:cursor-pointer ${edit.deleted.includes(choice.id) ? 'line-through text-red-700 hover:text-red-600/60' : 'hover:text-base-content/60'}`} 
                        onClick={() => 
                          !edit.deleted.includes(choice.id)
                          ? poll.choices.length - edit.deleted.length > 2 && setEdit({ ...edit, deleted: [ ...edit.deleted, choice.id ] })
                          : poll.choices.length - edit.deleted.length > 1 && setEdit({ ...edit, deleted: [ ...edit.deleted.filter(del => del !== choice.id) ] })
                        }
                      >
                        {choice.name}
                      </p>
                  }
                </div>
              ))}
              {(edit?.edit && edit.id === poll.id) && 
                edit.choices.map((choice, i) => (
                  <Input 
                    key={i}
                    type='text'
                    placeholder={`${poll.choices.length + i + 1}. Opcja`}
                    value={choice}
                    onChange={e => {
                      let newChoices = [ ...edit.choices ]
                      newChoices[i] = e.target.value
                      setEdit({ ...edit, choices: [ ...newChoices ] })
                    }}
                    onBlur={e => {
                      if(e.target.value === '') {
                        setEdit({ 
                          ...edit, choices: [ ...edit.choices.filter(choice => choice.trim() !== '') ], 
                          errors: [ ...edit.errors.splice(i, 2) ] 
                        })
                      }
                      else {
                        let newErrors = [ ...edit.errors ]
                        newErrors[i] = choice.length < 3
                          ? 'Opcja za krótka (<3)'
                          : choice.length > 60
                          ? 'Opcja za długa (>60)'
                          : ''
                        setEdit({ ...edit, errors: [ ...newErrors ] })
                      }
                    }}
                    error={{ valid: false, message: edit.errors[i] }}
                  />
                ))
              }
            </div>
            <p className='mb-2'>{poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0)} głosów</p>
            {poll.creator.id === user.id && 
              <div className='flex gap-x-1'>
                {!edit?.edit ||edit.id !== poll.id
                  ? <>
                    <Button size='sm' color='info' onClick={() => setEdit({ ...edit, edit: true, id: poll.id })} className='text-white'>Edytuj</Button>
                    <Button size='sm' color='error' onClick={() => deletePoll(poll.id)} className='text-white'>Usuń</Button>
                  </>
                  : 
                    <>
                      <Button size="sm" color='success' onClick={editPoll} className='text-white'>Zapisz</Button>
                      <Button size="sm" color='warning' onClick={() => setEdit({ edit: false, id: -1, choices: [], deleted: [], errors: [] })} className='text-white'>Anuluj</Button>
                    </>
                }
              </div>}
          </>}
    </Box>
  )
}

export default Poll