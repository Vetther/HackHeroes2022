import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button, Modal } from 'react-daisyui'
import jwtDecode from 'jwt-decode'

import Event from '../components/Event'
import ModalInput from '../components/ModalInput'

export default function Events() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)
  const [address, setAddress] = useState('')
  const [modalValues, setModalValues] = useState({
    img: '',
    title: '',
    summary: '',
    description: '',
    datetime: '',
  })
  const user = useContext(AuthContext)

  const getEvents = () => {
    fetch('http://141.147.1.251:5000/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents([...data.data.content]))
  }

  useEffect(() => {
    getEvents()
  }, [])

  const isDisabled = () => {
    return (modalValues.img === '' || modalValues.title === '' || address === '' || 
            modalValues.summary === '' || modalValues.description === '' || 
            modalValues.datetime === '')
  }

  const resetModal = () => {
    setAddress('')
    setModalValues({
      img: '',
      title: '',
      summary: '',
      description: '',
      datetime: '',
    })
    setModal(false)
  }

  const addEvent = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.authTokens.access_token}`,
      },
      body: JSON.stringify({
        imageUrl: modalValues.img,
        title: modalValues.title,
        address: address,
        shortDescription: modalValues.summary,
        longDescription: modalValues.description,
        eventTime: Math.floor(new Date(modalValues.datetime).getTime() / 1000),
        creator_id: user.user.id,
        tagId: [1],
      })
    })
    const data = response.json()

    console.log();

    if(response.status === 200) {

    }
    
    getEvents()
    resetModal()
  }

  return (
    <>
      <div className="flex flex-col w-5/6 mx-auto mt-8 gap-y-4">
        <input type="text" placeholder='Wyszukaj wydarzenia...' className='border border-base-300 focus:outline-none focus:border-primary rounded-md w-full p-2 input' />
        <div className="flex justify-end">
          <Button color='primary' onClick={() => setModal(true)}>Stwórz</Button>
        </div>
        <div className="xl:flex gap-x-2">
          <div className='xl:w-3/12 xl:h-1/6 mb-4 xl:mb-0 bg-slate-300 rounded-lg p-4 drop-shadow-lg xl:order-last'>

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
      <Modal open={modal} onClickBackdrop={() => setModal(false)}>
        <Modal.Header className='flex justify-between'>
          <p className='font-bold text-2xl'>Stwórz Wydarzenie</p>
          <Button size='sm' onClick={() => setModal(false)}>X</Button>
        </Modal.Header>
        <Modal.Body className='flex flex-col gap-y-4'>
          <ModalInput title='Zdjęcie(url)' required type='text' value={modalValues.img} onChange={e => setModalValues({...modalValues, img: e.target.value})} />
          <ModalInput title='Tytuł' required type='text' value={modalValues.title} onChange={e => setModalValues({...modalValues, title: e.target.value})} />
          <ModalInput title='Adres' required type='searchbar' onChange={setAddress}  />
          <ModalInput title='Krótki Opis' required type='text' value={modalValues.summary} onChange={e => setModalValues({...modalValues, summary: e.target.value})} />
          <ModalInput title='Opis' required type='textarea' value={modalValues.description} onChange={e => setModalValues({...modalValues, description: e.target.value})} />
          <ModalInput title='Data Wydarzenia' required type='datetime-local' value={modalValues.datetime} onChange={e => setModalValues({...modalValues, datetime: e.target.value})} />
          <Button color='primary' disabled={isDisabled()} onClick={addEvent}>Stwórz</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
