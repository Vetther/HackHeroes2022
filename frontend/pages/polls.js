import { useContext, useState } from "react"
import { Radio, Button } from "react-daisyui"
import Router from 'next/router'

import AuthContext from "../contexts/auth"

import Box from "../components/Box"
import PollModal from "../components/PollModal"

const Polls = ({ polls }) => {
  const { user, tokens } = useContext(AuthContext)
  const [ modal, setModal ] = useState(false)
  const [ radio, setRadio ] = useState({ id: -1, selected: -1 })

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
              {!poll.choices.some(choice => choice.voters.some(vote => vote.id === user?.id))
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
                : <div className='flex flex-col gap-y-2'>
                    {poll.choices.map(choice => (
                      <div key={choice.id} className="flex justify-between">
                        <div className="w-3/4 bg-base-300 rounded-full relative">
                          {choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) > 0 && 
                            <div 
                              className="bg-primary text-sm rounded-full h-full" 
                              style={{ width: `${choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100}%` }}
                            ></div>
                          }
                          <span className="ml-1 absolute top-0 text-base-100">{choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100}%</span>
                        </div>
                        <p>{choice.name}</p>
                      </div>
                    ))}
                  </div>}
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