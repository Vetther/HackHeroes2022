import { useContext } from 'react'
import { Button } from 'react-daisyui'
import Router, { useRouter } from 'next/router'

import AuthContext from '../../contexts/auth'

import Box from '../../components/Box'

const UserEvent = ({ event }) => {
  const { user, tokens } = useContext(AuthContext)
  const router = useRouter()

  event = { ...event?.data, eventDate: new Date(event?.data.eventDate) }

  const join = async () => {
    if(!user) {
      router.push('/login')
    }
    else {
      const response = await fetch(`http://141.147.1.251:5000/api/v1/event/${event.id}/join`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`,
        }
      })
      const data = await response.json()
      if (data.success) {
        Router.reload()
      }
    }
  }

  const quit = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/event/${event.id}/quit`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    const data = await response.json()
    if (data.success) {
      Router.reload()
    }
  }

  const deleteEvent = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/event/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    
    if(response.status === 200) {
      router.push('/events')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Box className='w-7/12'>
        <p>{event.creator.name}</p>
        <p>{event.interested.length}</p>
        {user && (user?.id !== event.creator.id ?
          !event.interested.some(int => int.id === user?.id) ?
            <Button color='success' onClick={join}>Dołącz</Button>
          :
            <Button color='warning' onClick={quit}>Zrezygnuj</Button>
        :
          <Button color='error' onClick={deleteEvent}>Usuń</Button>)}
      </Box>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query
  const res = await fetch(`http://141.147.1.251:5000/api/v1/event/${id}`)
  const event = await res.json()
  
  return {
    props: { event }
  }
}

export default UserEvent