import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button, Modal } from 'react-daisyui'

import Event from '../components/Event'
import EventModal from '../components/EventModal'

export default function Events() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetch('http://141.147.1.251:5000/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents([...data.data.content]))
  }, [])

  return (
    <>
      <div className="flex flex-col w-5/6 mx-auto mt-8 gap-y-4">
        <input type="text" placeholder='Wyszukaj wydarzenia...' className='border border-base-300 focus:outline-none focus:border-primary rounded-md w-full p-2 input' />
        {user &&
        <div className="flex justify-end">
          <Button color='primary' onClick={() => setModal(true)}>Stwórz</Button>
        </div>
        }
        <div className="xl:flex gap-x-2">
          <div className='xl:w-3/12 xl:h-1/6 mb-4 xl:mb-0 bg-base-100 rounded-lg p-4 drop-shadow-lg xl:order-last'>

          </div>
          <div className='flex flex-col xl:w-9/12 gap-y-4'>
            {events.map(event => (
              <Event 
                key={event.id} 
                id={event.id} 
                address={event.address}
                creator={event.creator}
                eventDate={event.eventDate}
                img={event.imageUrl}
                interested={event.interested.length}
                summary={event.shortDescription}
                // tags={event.tags}
                title={event.title}
              />
            ))}
          </div>
        </div>
      </div>
      <EventModal open={modal} setOpen={setModal} />
    </>
  )
}
