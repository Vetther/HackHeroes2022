import { useContext, useState, useEffect } from "react"
import { Radio, Button, Tooltip } from "react-daisyui"
import Router from 'next/router'

import AuthContext from "../contexts/auth"
import AlertContext from '../contexts/alert'

import Box from "../components/Box"
import PollModal from "../components/PollModal"
import Input from "../components/Input"

const Polls = ({ polls }) => {
  const { user, tokens } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)
  const [ modal, setModal ] = useState(false)
  const [ radio, setRadio ] = useState({ id: -1, selected: -1 })
  const [ edit, setEdit ] = useState({ edit: false, id: -1, choices: [], deleted: [], errors: [] })

  useEffect(() => {
    if(polls?.data.find(poll => poll.id === edit.id)?.choices.length < 5) {
      setEdit({ ...edit, choices: [''], deleted: [] })
    }
  }, [ edit.id ])
  
  useEffect(() => {
    if(edit.choices.at(-1) !== '' && polls.data.find(poll => poll.id === edit.id)?.choices.length + edit.choices.length < 5) {
      setEdit({ ...edit, choices: [ ...edit.choices, '' ], errors: [ ...edit.errors, '' ] })
    }
  }, [ edit.choices ])

  const vote = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/poll/${radio.id}/choice/${radio.selected}/vote`, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    const data = await response.json()
    
    if(data.success) {
      Router.reload()
    }
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas głosowania na Ankietę' })
    }
  }
  
  const editPoll = async () => {
    const choicesRes = await Promise.all(edit.choices.filter(choice => choice !== '').map(choice => 
      fetch(`http://141.147.1.251:5000/api/v1/poll/${edit.id}/addchoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        },
        body: JSON.stringify({ name: choice })
      })
    ))
    const deletedRes = await Promise.all(edit.deleted.map(del =>
      fetch(`http://141.147.1.251:5000/api/v1/poll/${edit.id}/choice/${del}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        }
      })
    ))
    const choices = await Promise.all(choicesRes.map(res => res.json()))
    const deleted = await Promise.all(deletedRes.map(res => res.json()))

    if(choices.every(choice => choice.success) && deleted.every(del => del.success)) Router.reload()
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas edycji Ankiety' })
    }
  }

  const deletePoll = async id => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/poll/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    const data = await response.json()

    if(data.success) {
      Router.reload()
    }
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas usuwania Ankiety' })
    }
  }

  return (
    <>
      <div className="w-11/12 mx-auto pt-16">
        <Button color='primary' className='mb-6' onClick={() => setModal(true)}>Stwórz</Button>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
          {polls?.data.map(poll => ({ ...poll, publicationDate: new Date(poll.publicationDate) })).map(poll => (
            <Box key={poll.id}>
              <h1 className='font-bold text-xl uppercase mb-0.5'>{poll.title}</h1>
              <p className='text-base-content/70 text-sm mb-2'>{poll.creator.name} &#8226; {poll.publicationDate.toLocaleTimeString([], {
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
                          <Radio name={poll.id} checked={radio.id === poll.id && radio.selected === choice.id} readOnly />
                          <p className='ml-2'>{choice.name}</p>
                        </div>
                      ))}
                    </div>
                    <Button size='sm' color='primary' disabled={radio.id !== poll.id} onClick={vote}>Zagłosuj</Button>
                  </>
                : <>
                    <div className='flex flex-col gap-y-2 mb-4'>
                      {poll.choices.map(choice => (
                        <div key={choice.id} className="flex justify-between">
                          {(!edit.edit || edit.id !== poll.id)  
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
                      {(edit.edit && edit.id === poll.id) && 
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
                    {poll.creator.id === user.id && 
                      <div className='flex gap-x-1'>
                        {!edit.edit ||edit.id !== poll.id
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
          ))}
        </div>
      </div>
      <PollModal open={modal} onClickBackdrop={() => setModal(false)} />
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://141.147.1.251:5000/api/v1/polls')
  const polls = await res.json()

  return {
    props: { polls }
  }
}

export default Polls