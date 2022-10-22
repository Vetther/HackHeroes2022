import { useContext, useEffect, useState } from 'react'
import { Modal, Button } from "react-daisyui"
import Router from 'next/router'

import AuthContext from '../contexts/auth'
import AlertContext from '../contexts/alert'

import Input from './Input'
import Tag from './Tag'

const EventModal = ({ open, onClickBackdrop, tags, id, ...args }) => {
  const { user, tokens } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)
  const [inputs, setInputs] = useState({
    img: '',
    title: '',
    summary: '',
    description: '',
    datetime: '',
    tags: [],
  })
  const [ address, setAddress ] = useState('')
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
    tags: {
      valid: false,
      message: '',
    }, 
  })
  const [ addressError, setAddressError ] = useState({
    valid: false,
    message: '',
  })

  const submitAddress = address => {
    setAddress(address)
    if(!id) setAddressError({ valid: true, message: '' })
  }

  const isCorrectImg = () => {
    if(!inputs.img.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')) {
      setErrors({ ...errors, img: { valid: false, message: 'Błędna Ścieżka URL' } })
    }
    else  {
      setErrors({ ...errors, img: { valid: true, message: '' } })
    }
  }

  const isCorrectTitle = () => {
    if(inputs.title.length < 6) {
      setErrors({ ...errors, title: { valid: false, message: 'Tytuł za krótki (<6)' } })
    }
    else if(inputs.title.length > 60) {
      setErrors({ ...errors, title: { valid: false, message: 'Tytuł za długi (>60)' } })
    }
    // else if(!inputs.title.match('^[\w\s]+$')) {
    //   setErrors({ ...errors, title: { valid: false, message: 'Błędny Tytuł' } })
    // }
    else {
      setErrors({ ...errors, title: { valid: true, message: '' } })
    }
  }

  const isCorrectSummary = () => {
    if(inputs.summary.length < 6) {
      setErrors({ ...errors, summary: { valid: false, message: 'Podsumowanie za krótkie (<6)' } })
    }
    else if(inputs.summary.length > 100) {
      setErrors({ ...errors, summary: { valid: false, message: 'Podsumowanie za długie (>100)' } })
    }
    else {
      setErrors({ ...errors, summary: { valid: true, message: '' } })
    }
  }

  const isCorrectDescription = () => {
    if(inputs.description.length < 16) {
      setErrors({ ...errors, description: { valid: false, message: 'Opis za krótki (<16)' } })
    }
    else if(inputs.description.length > 800) {
      setErrors({ ...errors, description: { valid: false, message: 'Opis za długi (>800)' } })
    }
    else {
      setErrors({ ...errors, description: { valid: true, message: '' } })
    }
  }

  const isCorrectDatetime = () => {
    const eventSeconds = new Date(inputs.datetime).getTime() / 1000
    const currentSeconds = Math.floor(new Date() / 1000)
    const minutes = 5

    if(eventSeconds + minutes * 60 - currentSeconds < 300 + (minutes - 1) * 60) {
      setErrors({ ...errors, datetime: { valid: false, message: `Czas Wydarzenia jest za wcześnie (<${minutes}min)` } })
    }
    else {
      setErrors({ ...errors, datetime: { valid: true, message: '' } })
    }
  }
  
  const isCorrectTags = () => {
    if(inputs.tags.length === 0) {
      setErrors({ ...errors, tags: { valid: false, message: 'Za mało tagów (<1)' } })
    }
    else if(inputs.tags.length > 5) {
      setErrors({ ...errors, tags: { valid: false, message: 'Za dużo tagów (>5)' } })
    }
    else {
      setErrors({ ...errors, tags: { valid: true, message: '' } })
    }
  }

  const isDisabled = () => {
    return !errors.img.valid || !errors.title.valid || !errors.summary.valid ||
      !errors.description.valid || !errors.datetime.valid && !id || !errors.tags.valid && !id ||
      !addressError.valid
  }
  
  const reset = () => {
    setInputs(Object.fromEntries(Object.keys(inputs).map(input => [ input, '' ])))
    setAddress('')
    onClickBackdrop()
  }

  const addEvent = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify({
        imageUrl: inputs.img,
        title: inputs.title,
        address: address,
        shortDescription: inputs.summary,
        longDescription: inputs.description,
        eventTime: new Date(inputs.datetime).getTime() / 1000,
        creator_id: user.id,
        tagId: inputs.tags,
      })
    })
    const data = await response.json()
    
    if(data.success) {
      reset()
      Router.reload()
      setAlert({ visible: true, type: 'success', message: 'Pomyślnie dodano Wydarzenie.' })
    }
    else {
      reset()
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas tworzenia Wydarzenia.' })
    }
  }

  const editEvent = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/event/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify({
        imageUrl: inputs.img,
        title: inputs.title,
        address: address,
        shortDescription: inputs.summary,
        longDescription: inputs.description,
        creator_id: user.id,
      })
    })
    const data = await response.json()

    if(data.success) {
      reset()
      Router.reload()
      setAlert({ visible: true, type: 'success', message: 'Pomyślnie zedytowano Wydarzenie.' })
    }
    else {
      reset()
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas edytowania Wydarzenia.' })
    }
  }

  useEffect(() => {if(!id) isCorrectImg()}, [inputs.img])
  useEffect(() => {if(!id) isCorrectTitle()}, [inputs.title])
  useEffect(() => {if(!id) isCorrectSummary()}, [inputs.summary])
  useEffect(() => {if(!id) isCorrectDescription()}, [inputs.description])
  useEffect(() => {if(!id) isCorrectDatetime()}, [inputs.datetime])
  useEffect(() => {if(!id) isCorrectTags()}, [inputs.tags])

  return (
    <Modal open={open} onClickBackdrop={onClickBackdrop} {...args}>
      <Modal.Header className='flex justify-between'>
        <p className='font-bold text-2xl'>{id ? 'Edytuj' : 'Stwórz'} Wydarzenie</p>
        <Button size='sm' onClick={onClickBackdrop} color='primary'>x</Button>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-y-8 p-1'>
        <Input
          error={errors.img}
          type='text'
          placeholder='URL Zdjęcia'
          value={inputs.img}
          onChange={e => setInputs({ ...inputs, img: e.target.value })}
          onBlur={() => {if(!id || inputs.title.length !== 0) isCorrectImg()}}
        />
        <Input
          error={errors.title}
          type='text'
          placeholder='Tytuł'
          value={inputs.title}
          onChange={e => setInputs({ ...inputs, title: e.target.value })}
          onBlur={() => {if(!id || inputs.title.length !== 0) isCorrectTitle()}}
        />
        <Input
          error={errors.address}
          type='address'
          placeholder='Adres'
          value={address}
          onChange={e => setAddress(e.target.value)}
          onBlur={() => setAddressError({ valid: false, message: 'Nie Wybrano Adresu' })}
          onPlaceSelected={submitAddress}
        />
        <Input
          error={errors.summary}
          type='text'
          placeholder='Podsumowanie'
          value={inputs.summary}
          onChange={e => setInputs({ ...inputs, summary: e.target.value })}
          onBlur={() => {if(!id || inputs.title.length !== 0) isCorrectSummary()}}
        />
        <Input
          error={errors.description}
          type='textarea'
          placeholder='Opis'
          value={inputs.description}
          onChange={e => setInputs({ ...inputs, description: e.target.value })}
          onBlur={() => {if(!id || inputs.title.length !== 0) isCorrectDescription()}}
        />
        {!id && <Input
          error={errors.datetime}
          type='datetime-local'
          placeholder='Data Wydarzenia'
          value={inputs.datetime}
          onChange={e => setInputs({ ...inputs, datetime: e.target.value })}
          onBlur={() => {if(!id || inputs.title.length !== 0) isCorrectDatetime()}}
        />}
        {!id && <div>
          <div className="flex gap-x-1 mb-4">
            {tags?.map(tag => (
              <Tag 
                key={tag.id} 
                tag={tag}
                onClick={() => 
                  !inputs.tags.includes(tag.id) 
                  ? setInputs({ ...inputs, tags: [ ...inputs.tags, tag.id ] })
                  : setInputs({ ...inputs, tags: [ ...inputs.tags.filter(sTag => sTag !== tag.id) ] })
                } 
                selected={inputs.tags.includes(tag.id)}
              />
            ))}
          </div>
          {(!errors.tags.valid && errors.tags.message !== '') && <p className='text-red-700'>{errors.tags.message}</p>}
        </div>}
        <Button color='primary' onClick={id ? editEvent : addEvent} disabled={id ? true : isDisabled()}>{id ? 'Edytuj' : 'Stwórz'}</Button>
      </Modal.Body>
    </Modal>
  )
}

export default EventModal