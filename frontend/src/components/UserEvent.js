import React, { useContext } from 'react'
import AuthContext from '../AuthContext'
import { Link } from 'react-router-dom'
import { Button, Tooltip } from 'react-daisyui'

export default function UserEvent({ event, bg }) {
  /* const { authTokens } = useContext(AuthContext)

  const deleteEvent = async () => {
    await fetch(`http://141.147.1.251:5000/api/v1/event/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access_token}`,
      }
    })
  } */

  return (
    <Link to={`/event/${event.id}`} className='hover:brightness-90'>
      <div className={`lg:flex justify-between items-center bg-base-${bg} p-4 border-b border-gray-400`}>
        <p className='text-xl font-bold'>{event.title}</p>
        <Tooltip message='Data Utworzenia'>
          <p className='text-lg'>{new Date(event.publicationDate).toLocaleString()}</p>
        </Tooltip>
        <Tooltip message='Data Wydarzenia'>
          <p className='text-lg'>{new Date(event.eventDate).toLocaleString()}</p>
        </Tooltip>
        {/* <Button color='error' className='text-white z-10' onClick={deleteEvent}>Usuń</Button> */}
      </div>
    </Link>
  )
}
