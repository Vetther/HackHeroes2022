import { useContext, useEffect, useState } from 'react'
import { Button, Countdown, Divider } from 'react-daisyui'
import Router, { useRouter } from 'next/router'
import Link from "next/link"

import AuthContext from '../../contexts/auth'

import Box from '../../components/Box'
import Tag from '../../components/Tag'

const UserEvent = ({ event }) => {
  const { user, tokens } = useContext(AuthContext)
  const router = useRouter()

  const [seconds, setSeconds] = useState(0);

  event = { ...event?.data, eventDate: new Date(event?.data.eventDate)}

  useEffect(() => {
    const interval = setInterval(() => {

      let diff = Math.abs(event.eventDate - new Date())
      setSeconds(diff)

    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const edit = () => {
    
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
      <Box className='items-center md:w-3/6'>
        <div className="avatar w-full justify-center mt-4">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={event.imageUrl}/>
          </div>
        </div>
        <p className="text-2xl w-full text-center mt-6 font-semibold">{event.title}</p>
        <Divider className='mb-2' />
        <div className='text-center'>
          <p className='text-base-content/70 text-md mb-1'>
            Data:
            <span className='font-medium pt-1 ml-2'>{event.eventDate?.toLocaleTimeString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}</span>
          </p>
          <p className='text-base-content/70 text-md'>
            Organizator:
            <Link href={`/profile/${event.creator.name}`}>
              <a className='text-base-content/70 ml-2 text-md font-medium'>{event.creator.name}</a>
            </Link>
          </p>
          <p className='text-md text-base-content/70 font-medium pt-1 mb-4'>{event.address}</p>
          <div className="flex justify-center gap-x-2">
            {event.tags.map(tag => (
              <Tag tag={tag} selected={false} />
            ))}
          </div>
        </div>
        <div className='flex justify-center items-center text-center mt-6 gap-x-1.5'>
          {user && (user?.id !== event.creator.id
              ? !event.interested.some(int => int.id === user?.id) 
                ? <Button color='success' onClick={join}>Dołącz</Button>
                : <Button color='warning' onClick={quit}>Zrezygnuj</Button>
              :
                <>
                  <Button color='info' onClick={edit}>Edytuj</Button>
                  <Button color='error' onClick={deleteEvent}>Usuń</Button>
                </>
          )}
        </div>
        <p className='mt-12 break-all'>{event.longDescription}</p>
        <div className="stats stats-vertical lg:stats-horizontal mt-12 w-full justify-center items-center text-center">
          <div className="stat">
            <div className="stat-title text-right">Zainteresowani</div>
            <div className="stat-value font-mono text-3xl text-right">{event.interested.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title text-right">Odbędzie się za:</div>
            <div className="stat-value text-right">
              <span className="font-mono text-3xl">
                <Countdown value={Math.floor(seconds / 1000 / 60 / 60 / 24) > 99 ? 99 : Math.floor(seconds / 1000 / 60 / 60 / 24)} />:
                <Countdown value={Math.floor(seconds / 1000 / 60 / 60 % 24)} />:
                <Countdown value={Math.floor(seconds / 1000 / 60 % 60)} />:
                <Countdown value={Math.floor(seconds / 1000 % 60)} />
              </span>
            </div>
          </div>
        </div>
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

/* await fetch('http://141.147.1.251:5000/api/v1/event/create', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`,
  },
  body: JSON.stringify({
    imageUrl: input.img,
    title: input.title,
    address: input.address,
    shortDescription: input.summary,
    longDescription: input.description,
    eventTime: new Date(input.datetime).getTime() / 1000,
    creator_id: user.id,
    tagId: [1],
  })
}) */