import { useState, useEffect } from "react"
import { Button, Tooltip } from "react-daisyui"
import Link from "next/link"
import { useRouter } from "next/router"

import Box from "../../../components/Box"
import EventModal from '../../../components/EventModal'
import Tag from "../../../components/Tag"

const Events = ({ events, tags }) => {
  const router = useRouter()
  const [ user, setUser ] = useState({ user: null, events: [] })
  const [ modal, setModal ] = useState(false)

  useEffect(() => {
    fetch(`http://141.147.1.251:5000/api/v1/user/${router.asPath.split('/').at(-2)}`)
    .then(res => res.json())
    .then(data => !data.data.id ? router.push('/') : setUser({
      user: data.data,
      events: [ 
        ...events.data.content
        .filter(event => event.creator.id === data.data.id)
        .map(event => ({ ...event, eventDate: new Date(event.eventDate) })) 
      ]
    }))
  }, [])

  return (
    <>
      <div className="w-full pt-16">
        <Box className='w-2/3 mx-auto'>
          <div className="sm:flex justify-between items-center mb-6">
            <p className="text-primary text-2xl font-bold sm:mb-0 mb-4">Wydarzenia Użytkownika {user.user?.name}</p>
            <Button color='primary' size='sm' onClick={() => setModal(true)}>Stwórz</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {user?.events.map(event => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <a className='hover:text-base-content/70'>
                  <Box key={event.id} className='flex flex-col gap-y-2'>
                    <h1 className="font-bold text-xl uppercase mb-0.5">{event.title}</h1>
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
      </div>
      <EventModal open={modal} onClickBackdrop={() => setModal(false)} tags={tags?.data} />
    </>
  )
}

export const getServerSideProps = async () => {
  const [ eventsRes, tagsRes ] = await Promise.all([
    fetch('http://141.147.1.251:5000/api/v1/events'),
    fetch('http://141.147.1.251:5000/api/v1/tags'),
  ])
  const [ events, tags ] = await Promise.all([
    eventsRes.json(),
    tagsRes.json(),
  ])

  return {
    props: { events, tags }
  }
}

export default Events