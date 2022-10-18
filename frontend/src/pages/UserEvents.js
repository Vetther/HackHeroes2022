import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../AuthContext'
import { Button } from 'react-daisyui'

import UserEvent from '../components/UserEvent'
import EventModal from '../components/EventModal'

export default function UserEvents() {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    fetch('http://141.147.1.251:5000/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents([...data.data.content.filter(event => event.creator.id === user.id)]))
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className='bg-base-100 border border-base-300 p-6 w-3/4 rounded-lg'>
          <div className="flex justify-between items-center">
            <p className="text-primary text-3xl font-bold">Twoje Wydarzenia</p>
            <Button color='primary' onClick={() => setModal(true)}>Stwórz</Button>
          </div>
          <div className={`${events.length !== 0 && 'mt-6'}`}>
            {events.map((event, i) => (
              <UserEvent key={i} event={event} bg={i % 2 === 0 ? '300' : '100'} />
            ))}
          </div>
        </div>
      </div>
      <EventModal open={modal} setOpen={setModal} />
    </>
  )
}
