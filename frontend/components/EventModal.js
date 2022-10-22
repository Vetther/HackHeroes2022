import { useContext, useState } from 'react'
import { Modal, Button } from "react-daisyui"
import Router from 'next/router'

import AuthContext from '../contexts/auth'

import Input from './Input'

const EventModal = ({ open, onClickBackdrop, ...args }) => {
  const { user, tokens } = useContext(AuthContext)
  const [input, setInput] = useState({
    img: '',
    title: '',
    address: '',
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
    address: {
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

  const setAddress = (address) => {
    setInput({ ...input, address: address })
    setErrors({ ...errors, address: { valid: true, message: '' } })
  }

  const isCorrectImg = () => {
    if(!input.img.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')) {
      setErrors({ ...errors, img: { valid: false, message: 'Błędna Ścieżka URL' } })
    }
    else  {
      setErrors({ ...errors, img: { valid: true, message: '' } })
    }
  }

  const isCorrectTitle = () => {
    if(input.title.length < 6) {
      setErrors({ ...errors, title: { valid: false, message: 'Tytuł za krótki (<6)' } })
    }
    else if(input.title.length > 60) {
      setErrors({ ...errors, title: { valid: false, message: 'Tytuł za długi (>60)' } })
    }
    else if(!input.title.match('^[\w\s]+$')) {
      setErrors({ ...errors, title: { valid: false, message: 'Błędny Tytuł' } })
    }
    else {
      setErrors({ ...errors, title: { valid: true, message: '' } })
    }
}

  const isCorrectSummary = () => {
    if(input.summary.length < 6) {
      setErrors({ ...errors, summary: { valid: false, message: 'Podsumowanie za krótki (<6)' } })
    }
    else if(input.summary.length > 100) {
      setErrors({ ...errors, summary: { valid: false, message: 'Podsumowanie za długi (>100)' } })
    }
    else {
      setErrors({ ...errors, summary: { valid: true, message: '' } })
    }
  }

  const isCorrectDescription = () => {
    if(input.description.length < 16) {
      setErrors({ ...errors, description: { valid: false, message: 'Opis za krótki (<16)' } })
    }
    else if(input.description.length > 800) {
      setErrors({ ...errors, description: { valid: false, message: 'Opis za długi (>800)' } })
    }
    else {
      setErrors({ ...errors, description: { valid: true, message: '' } })
    }
  }

  const isCorrectDatetime = () => {
    const eventSeconds = new Date(input.datetime).getTime() / 1000
    const currentSeconds = Math.floor(new Date() / 1000)
    const minutes = 5

    if(eventSeconds + minutes * 60 - currentSeconds < 300 + (minutes - 1) * 60) {
      setErrors({ ...errors, datetime: { valid: false, message: `Czas Wydarzenia jest za wcześnie (<${minutes}min)` } })
    }
    else {
      setErrors({ ...errors, datetime: { valid: true, message: '' } })
    }
  }

  const isDisabled = () => {
    return Object.values(errors).some(error => !error.valid)
  }
  
  const reset = () => {
    setInput(Object.fromEntries(Object.keys(input).map(input => [input, ''])))
  }

  const addEvent = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/event/create', {
      method: 'POST',
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
    })
    const data = await response.json()

    reset()

    Router.reload()
  }

  return (
    <Modal open={open} onClickBackdrop={onClickBackdrop} {...args}>
      <Modal.Header className='flex justify-between'>
        <p className='font-bold text-2xl'>Stwórz Wydarzenie</p>
        <Button size='sm' onClick={onClickBackdrop} color='primary'>x</Button>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-y-12 p-1'>
        <Input
          error={errors.img}
          type='text'
          placeholder='URL Zdjęcia'
          value={input.img}
          onChange={e => setInput({ ...input, img: e.target.value })}
          onBlur={isCorrectImg}
        />
        <Input
          error={errors.title}
          type='text'
          placeholder='Tytuł'
          value={input.title}
          onChange={e => setInput({ ...input, title: e.target.value })}
          onBlur={isCorrectTitle}
        />
        <Input
          error={errors.address}
          type='address'
          placeholder='Adres'
          value={input.address}
          onChange={e => setInput({ ...input, address: e.target.value })}
          onBlur={() => setErrors({ ...errors, address: { valid: false, message: 'Nie Wybrano Adresu' } })}
          onPlaceSelected={setAddress}
        />
        <Input
          error={errors.summary}
          type='text'
          placeholder='Podsumowanie'
          value={input.summary}
          onChange={e => setInput({ ...input, summary: e.target.value })}
          onBlur={isCorrectSummary}
        />
        <Input
          error={errors.description}
          type='textarea'
          placeholder='Opis'
          value={input.description}
          onChange={e => setInput({ ...input, description: e.target.value })}
          onBlur={isCorrectDescription}
        />
        <Input
          error={errors.datetime}
          type='datetime-local'
          placeholder='Data Wydarzenia'
          value={input.datetime}
          onChange={e => setInput({ ...input, datetime: e.target.value })}
          onBlur={isCorrectDatetime}
        />
        <Button color='primary' onClick={addEvent} disabled={isDisabled()}>Stwórz</Button>
      </Modal.Body>
    </Modal>
  )
}

export default EventModal