import { useState, useEffect } from 'react'
import { Tooltip } from 'react-daisyui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Box from '../../../components/Box'
import Tag from '../../../components/Tag'

const User = ({ events, polls }) => {
  const router = useRouter()
  const [ user, setUser ] = useState({ user: null, events: [], polls: [] })

  useEffect(() => {
    fetch(`http://141.147.1.251:5000/api/v1/user/${router.asPath.split('/').at(-1)}`)
    .then(res => res.json())
    .then(data => !data.data?.id ? router.push('/') : setUser({ 
      user: data.data, 
      events: [ 
        ...events.data.content
        .filter(event => event.creator.id === data.data.id)
        .map(event => ({ ...event, eventDate: new Date(event.eventDate) })) 
      ], 
      polls: [ 
        ...polls.data
        .filter(poll => poll.creator.id === data.data.id)
        .map(poll => ({ ...poll, publicationDate: new Date(poll.publicationDate) })) 
      ] 
    }))
  }, [ router.asPath ])

  return (
    <div className="w-2/3 mx-auto pt-8">
      <Box className='uppercase text-center text-5xl font-bold mb-16'>
        { user.user?.name }
      </Box>
      <div className="flex flex-col gap-y-4">
        <Box>
          <Link href={`/profile/${user.user?.name}/events`}>
            <a className='text-primary font-bold text-xl hover:text-violet-500/60'>Wydarzenia Użytkownika {user.user?.name}</a>
          </Link>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {user.events?.splice(0, 4).map(event => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <a className='hover:text-base-content/70'>
                  <Box key={event.id} className='flex flex-col gap-y-2'>
                    <h1 className="font-bold text-lg break-all">{event.title}</h1>
                    <Tooltip message='Adres' position='left' className='text-left'>
                      <p className='text-sm text-base-content/70'>{event.address}</p>
                    </Tooltip>
                    <Tooltip message='Data Wydarzenia' position='left' className='text-left'>
                      <p className='text-sm'>{event.eventDate?.toLocaleTimeString([], {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </Tooltip>
                    <Tooltip message='Podsumowanie' position='left' className='text-left break-all'>
                      <p className='text-sm'>{event.shortDescription}</p>
                    </Tooltip>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map(tag => (
                        <Tag key={tag.id} tag={tag} />
                      ))}
                    </div>
                  </Box>
                </a>
              </Link>
            ))}
          </div>
        </Box>
        <Box>
          <Link href={`/profile/${user.user?.name}/polls`}>
            <a className='text-primary font-bold text-xl hover:text-violet-500/60'>Ankiety Użytkownika {user.user?.name}</a>
          </Link>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            {user.polls?.splice(0, 4).map(poll => (
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
    </div>
  )
}

export const getServerSideProps = async () => {
  const [ eventsRes, pollsRes ] = await Promise.all([
    fetch('http://141.147.1.251:5000/api/v1/events'),
    fetch('http://141.147.1.251:5000/api/v1/polls'),
  ])
  const [ events, polls ] = await Promise.all([
    eventsRes.json(),
    pollsRes.json(),
  ])

  return {
    props: { events, polls }
  }
}

export default User