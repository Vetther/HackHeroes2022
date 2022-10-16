import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-daisyui'

import Event from '../components/Event'
import ModalInput from '../components/ModalInput'

export default function Events() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)
  const [address, setAddress] = useState('')
  const [modalValues, setModalValues] = useState({
    img: '',
    title: '',
    creatorName: '',
    creatorLastName: '',
    summary: '',
    description: '',
    datetime: '',
  })

  useEffect(() => {
    // const response = await fetch('http://141.147.1.251:5000/api/v1/events')
    // const data = await response.json()
    // console.log(data.data.content)
    fetch('http://141.147.1.251:5000/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents([...data.data.content]))
  }, [])

  console.log(events)

  const isDisabled = () => {
    return (modalValues.img === '' || modalValues.title === '' || address === '' || 
            modalValues.creatorName === '' || modalValues.summary === '' || modalValues.description === '' || 
            modalValues.datetime === '')
  }

  const addEvent = () => {
    setEvents([...events, {
      id: Object.keys(events).length,
      img: modalValues.img,
      title: modalValues.title,
      address: address,
      creator: `${modalValues.creatorName}${modalValues.creatorLastName && ' ' + modalValues.creatorLastName}`,
      summary: modalValues.summary,
      description: modalValues.description,
      datetime: modalValues.datetime,
      participating: 0,
    }])

    setAddress('')
    setModalValues({
      img: '',
      title: '',
      creatorName: '',
      creatorLastName: '',
      summary: '',
      description: '',
      datetime: '',
    })
    setModal(false)
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
            
          </div>
        </div>
      </div>
      <Modal open={modal} onClickBackdrop={() => setModal(false)}>
        <Modal.Header className='flex justify-between'>
          <p className='font-bold text-2xl'>Stwórz Wydarzenie</p>
          <Button size='sm' onClick={() => setModal(false)}>X</Button>
        </Modal.Header>
        <Modal.Body className='flex flex-col gap-y-4'>
          <ModalInput title='Zdjęcie' required type='file' value={modalValues.img} onChange={e => setModalValues({...modalValues, img: e.target.value})} />
          <ModalInput title='Tytuł' required type='text' value={modalValues.title} onChange={e => setModalValues({...modalValues, title: e.target.value})} />
          <ModalInput title='Adres' required type='searchbar' onChange={setAddress}  />
          <div className='flex justify-between'>
            <ModalInput title='Imię' required type='text' value={modalValues.creatorName} onChange={e => setModalValues({...modalValues, creatorName: e.target.value})} />
            <ModalInput title='Nazwisko' type='text' value={modalValues.creatorLastName} onChange={e => setModalValues({...modalValues, creatorLastName: e.target.value})} />
          </div>
          <ModalInput title='Krótki Opis' required type='text' value={modalValues.summary} onChange={e => setModalValues({...modalValues, summary: e.target.value})} />
          <ModalInput title='Opis' required type='textarea' value={modalValues.description} onChange={e => setModalValues({...modalValues, description: e.target.value})} />
          <ModalInput title='Data Wydarzenia' required type='datetime-local' value={modalValues.datetime} onChange={e => setModalValues({...modalValues, datetime: e.target.value})} />
          <Button color='primary' disabled={isDisabled()} onClick={addEvent}>Stwórz</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
