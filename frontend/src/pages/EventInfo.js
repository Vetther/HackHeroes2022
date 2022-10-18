import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Tooltip, Button, Modal } from 'react-daisyui'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser, faHand } from "@fortawesome/free-solid-svg-icons";


export default function EventInfo() {
  const { id } = useParams()
  const [ event, setEvent ] = useState({})
  const [ modal, setModal ] = useState(false)
  const { user, authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://141.147.1.251:5000/api/v1/event/${id}`)
    .then(response => response.json())
    .then(data => setEvent({...data.data, eventDate: new Date(data.data.eventDate)}))
  }, [])

  const join = () => {
    if(!user) {
      navigate('/login')
    } 
    else {
      fetch(`http://141.147.1.251:5000/api/v1/event/${id}/join`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access_token}`,
        }
      })
      .then(window.location.reload())
    }
  }

  const quit = () => {
    fetch(`http://141.147.1.251:5000/api/v1/event/${id}/quit`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access_token}`,
      }
    })
    .then(window.location.reload())
  }

  const deleteEvent = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/event/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access_token}`,
      }
    })
    
    if(response.status === 200) {
      navigate('/events')
    }
  }

  return (
    <>
      {event &&
      <div className="flex justify-center items-center h-full">
        <div className='bg-base-100 border border-base-300 rounded-lg p-4 w-2/3'>
          <div className="lg:flex justify-between">
            <div className="md:flex pr-3">
              <img src={event.imageUrl} alt={event.title} className='rounded-lg object-cover shadow-md w-60 h-60'/>
              <div className="flex flex-col justify-between md:ml-6 mt-3 md:mt-0">
                <div>
                  <p className='text-base-content text-xl font-semibold mb-2'>{event.title}</p>
                  <div className='flex items-center mb-2'>
                    <Tooltip message='Lokalizacja' className='flex tooltip-left'>
                      <FontAwesomeIcon icon={faLocationDot} className='info-content' style={{color: '#6b7280', width:17, height: 17}}/>
                      <p className='ml-2 text-sm text-base-content/70'>{event.address}</p>
                    </Tooltip>
                  </div>
                  <div className='flex items-center mb-4'>
                    <Tooltip message='Organizator' position="left" className='flex tooltip-left'>
                      <FontAwesomeIcon icon={faUser} style={{color: '#6b7280', width:17, height: 17}}/>
                      <Link to={`/profile/${event.creator?.name}`}>
                        <p className='text-base-content/70 ml-2 text-sm'>{event.creator?.name}</p>
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div> 
            <div className="md:flex flex-col justify-between mt-3 lg:mt-0">
              <p className='lg:text-end text-md font-medium my-3 md:my-0'>{event.eventDate?.toLocaleString()}</p>
              <div className='flex justify-between h-12'>
                <div className='flex items-center mr-6'>
                  <Tooltip message='Zainteresowani' className='flex'>
                    <FontAwesomeIcon icon={faHand} className='w-5 h-5 mt-1 mr-1' />
                    <p className='text-lg ml-1'>{event.interested?.length}</p>
                  </Tooltip>
                </div>
                {event.creator?.id !== user.id ?
                  (!event.interested?.some(int => int.id === user.id) ?
                  <Button color='primary' onClick={join}>Dołącz</Button>
                  :
                  <Button color='primary' onClick={quit}>Zrezygnuj</Button>
                  )
                :
                <Button color='error' className='text-white' onClick={deleteEvent}>Usuń</Button>
                }
              </div>
            </div>
          </div>
          <div className='mt-8'>
            {event.longDescription}
          </div>
        </div>
      </div>
      }
      <Modal open={modal} onClickBackdrop={() => setModal(false)}>
        <Modal.Header className='flex justify-between'>
          <p className='font-bold text-2xl'>Czy chcesz usunąć Wydarzenie {event.title}?</p>
        </Modal.Header>
        <Modal.Body>
          <Button className='warning'>Usuń</Button>
          <Button>Anuluj</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
