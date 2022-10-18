import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button, Modal } from 'react-daisyui'

import Event from '../components/Event'
import ModalInput from '../components/ModalInput'
import { ErrorResponse } from '@remix-run/router'

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
  const [errors, setErrors] = useState({
    img: {
      valid: false,
      message: '',
    },
    title: {
      valid: false,
      message: '',
    },
    summary: {
      valid: false,
      message: '',
    },
    description: {
      valid: false,
      message: '',
    },
    datetime: {
      valid: false,
      message: '',
    }, 
  })
  const { user, authTokens } = useContext(AuthContext)

  const getEvents = () => {
    fetch('http://141.147.1.251:5000/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents([...data.data.content]))
  }

  useEffect(() => {
    getEvents()
  }, [])

  const isCorrectImageURL = () => {
    if(!modalValues.img.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')) {
      setErrors({...errors, img: {valid: false, message: 'Niepoprawny URL'}})
    }
    else {
      setErrors({...errors, img: {valid: true, message: ''}})
    }
  }

  const isCorrectTitle = () => {
    setErrors({...errors, title: {valid: true, message: ''}})
  }

  const isCorrectSummary = () => {
    setErrors({...errors, summary: {valid: true, message: ''}})
  }

  const isCorrectDescription = () => {
    setErrors({...errors, description: {valid: true, message: ''}})
  }

  const isCorrectDatetime = () => {
    setErrors({...errors, datetime: {valid: true, message: ''}})
  }

  const isDisabled = () => {
    return Object.values(errors).some(error => !error.valid)
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
    await fetch('http://141.147.1.251:5000/api/v1/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access_token}`,
      },
      body: JSON.stringify({
        imageUrl: modalValues.img,
        title: modalValues.title,
        address: address,
        shortDescription: modalValues.summary,
        longDescription: modalValues.description,
        eventTime: Math.floor(new Date(modalValues.datetime).getTime() / 1000),
        creator_id: user.id,
        tagId: [1],
      })
    })
    getEvents()
    resetModal()
  }

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
          <ModalInput 
            title='Zdjęcie(url)' 
            required 
            type='text' 
            value={modalValues.img} 
            onChange={e => setModalValues({...modalValues, img: e.target.value})} 
            onBlur={isCorrectImageURL} 
            error={errors.img} 
          />
          <ModalInput 
            title='Tytuł' 
            required 
            type='text' 
            value={modalValues.title} 
            onChange={e => setModalValues({...modalValues, title: e.target.value})} 
            onBlur={isCorrectTitle} 
            error={errors.title} 
          />
          <ModalInput 
            title='Adres' 
            required 
            type='searchbar' 
            onChange={setAddress} 
          />
          <ModalInput 
            title='Krótki Opis' 
            required 
            type='text' 
            value={modalValues.summary} 
            onChange={e => setModalValues({...modalValues, summary: e.target.value})} 
            onBlur={isCorrectSummary} 
            error={errors.summary} 
          />
          <ModalInput 
            title='Opis' 
            required 
            type='textarea' 
            value={modalValues.description} 
            onChange={e => setModalValues({...modalValues, description: e.target.value})} 
            onBlur={isCorrectDescription} 
            error={errors.description}
          />
          <ModalInput 
            title='Data Wydarzenia' 
            required 
            type='datetime-local' 
            value={modalValues.datetime} 
            onChange={e => setModalValues({...modalValues, datetime: e.target.value})} 
            onBlur={isCorrectDatetime} 
            error={errors.datetime} 
          />
          <Button color='primary' disabled={isDisabled()} onClick={addEvent}>Stwórz</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
