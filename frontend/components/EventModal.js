import { useContext, useState } from 'react'
import { Modal, Button } from "react-daisyui"

import AuthContext from '../contexts/auth'

import Input from '../components/Input'

const EventModal = ({ open, onClickBackdrop, ...args }) => {
  const { user, tokens } = useContext(AuthContext)
  const [input, setInput] = useState({
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

  return (
    <Modal open={open} onClickBackdrop={onClickBackdrop} {...args}>
      <Modal.Header className='flex justify-between'>
        <p className='font-bold text-2xl'>Stwórz Wydarzenie</p>
        <Button size='sm' onClick={onClickBackdrop} color='primary'>x</Button>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-y-4'>
        <Input />
      </Modal.Body>
    </Modal>
  )
}

export default EventModal