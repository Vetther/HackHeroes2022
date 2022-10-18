import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-daisyui'

import AuthContext from '../AuthContext'

import ModalInput from './ModalInput'

export default function EventModal({ open, setOpen, add }) {
  const { user, authTokens } = useContext(AuthContext)
  const [values, setValues] = useState({
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
  const [address, setAddress] = useState('')

  const isCorrectImageURL = () => {
    if(!values.img.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')) {
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

  const addEvent = async () => {
    await fetch('http://141.147.1.251:5000/api/v1/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access_token}`,
      },
      body: JSON.stringify({
        imageUrl: values.img,
        title: values.title,
        address: address,
        shortDescription: values.summary,
        longDescription: values.description,
        eventTime: Math.floor(new Date(values.datetime).getTime() / 1000),
        creator_id: user.id,
        tagId: [1],
      })
    })

    resetModal()

    window.location.reload()
  }

  const resetModal = () => {
    setAddress('')
    setValues({
      img: '',
      title: '',
      summary: '',
      description: '',
      datetime: '',
    })
    setOpen(false)
  }

  return (
    <Modal open={open} onClickBackdrop={() => setOpen(false)}>
      <Modal.Header className='flex justify-between'>
        <p className='font-bold text-2xl'>Stwórz Wydarzenie</p>
        <Button size='sm' onClick={() => setOpen(false)}>X</Button>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-y-4'>
        <ModalInput 
          title='Zdjęcie(url)' 
          required 
          type='text' 
          value={values.img} 
          onChange={e => setValues({...values, img: e.target.value})} 
          onBlur={isCorrectImageURL} 
          error={errors.img} 
        />
        <ModalInput 
          title='Tytuł' 
          required 
          type='text' 
          value={values.title} 
          onChange={e => setValues({...values, title: e.target.value})} 
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
          value={values.summary} 
          onChange={e => setValues({...values, summary: e.target.value})} 
          onBlur={isCorrectSummary} 
          error={errors.summary} 
        />
        <ModalInput 
          title='Opis' 
          required 
          type='textarea' 
          value={values.description} 
          onChange={e => setValues({...values, description: e.target.value})} 
          onBlur={isCorrectDescription} 
          error={errors.description}
        />
        <ModalInput 
          title='Data Wydarzenia' 
          required 
          type='datetime-local' 
          value={values.datetime} 
          onChange={e => setValues({...values, datetime: e.target.value})} 
          onBlur={isCorrectDatetime} 
          error={errors.datetime} 
        />
        <Button color='primary' disabled={isDisabled()} onClick={addEvent}>Stwórz</Button>
      </Modal.Body>
    </Modal>
  )
}
