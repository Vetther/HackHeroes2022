import { useState, useEffect } from 'react'
import { Button, Tooltip } from 'react-daisyui'
import { useRouter } from 'next/router'

import Box from '../../../components/Box'
import PollModal from '../../../components/PollModal'

const polls = ({ polls }) => {
  const [ user, setUser ] = useState({ user: null, polls: [] })
  const [ modal, setModal ] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch(`http://141.147.1.251:5000/api/v1/user/${router.asPath.split('/').at(-2)}`)
    .then(res => res.json())
    .then(data => !data.data?.id ? router.push('/') : setUser({
      user: data.data,
      polls: [ 
        ...polls.data
        .filter(poll => poll.creator.id === data.data.id) 
        .map(poll => ({ ...poll, publicationDate: new Date(poll.publicationDate) }))
      ]
    }))
  }, [])

  return (
    <>
      <div className="w-full pt-16">
        <Box className='sm:w-2/3 w-4/5 mx-auto'>
          <div className="sm:flex justify-between items-center mb-6">
            <p className="text-primary text-2xl font-bold sm:mb-0 mb-4">Ankiety Użytkownika {user.user?.name}</p>
            <Button color='primary' size='sm' onClick={() => setModal(true)}>Stwórz</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {user.polls.map(poll => (
              <Box key={poll.id}>
                <h1 className='font-bold text-xl uppercase mb-0.5'>{poll.title}</h1>
                <p className='text-base-content/70 text-sm mb-2'>{poll.publicationDate.toLocaleTimeString([], {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <div className="flex flex-col gap-y-2 mb-4">
                  {poll.choices.map(choice => (
                    <div key={choice.id} className='flex justify-between'>
                      <div className="w-3/4 bg-base-300 rounded-full relative">
                        {Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100) > 0 
                        && <div 
                            className="bg-primary text-sm rounded-full h-full" 
                            style={{ width: `${Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100)}%` }}
                          ></div>
                        }
                        <Tooltip color='accent' position="right" className='ml-3 absolute top-0 text-base-100' message={`Głosów: ${choice.voters.length}`}>

                          {isNaN(Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100))
                              ? 0
                              : Math.floor(choice.voters.length / poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0) * 100)}%

                        </Tooltip>
                      </div>
                      <p className='pl-1'>{choice.name}</p>
                    </div>
                  ))}
                </div>
                <p>{poll.choices.reduce((sum, choice) => sum + choice.voters.length, 0)} głosów</p>
              </Box>
            ))}
          </div>
        </Box>
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

export default polls