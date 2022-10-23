import { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-daisyui'
import Router from 'next/router'

import AuthContext from '../contexts/auth'

import Input from '../components/Input'

const PollModal = ({ open, onClickBackdrop, ...args }) => {
  const { tokens } = useContext(AuthContext)
  const [ inputs, setInputs ] = useState({
    title: '',
    description: '',
    choices: [''],
  })
  const [ errors, setErrors ] = useState({
    title: '',
    description: '',
    choices: [''],
  })
  
  useEffect(() => {
    if(inputs.choices.at(-1) !== '' && inputs.choices.length < 5) {
      setInputs({ ...inputs, choices: [ ...inputs.choices, '' ] })
      setErrors({ ...errors, choices: [ ...errors.choices, '' ] })
    }
    else if(inputs.choices.at(-2) === '') {
      setInputs({ ...inputs, choices: [ ...inputs.choices.slice(0, -1) ] })
      setErrors({ ...errors, choices: [ ...errors.choices.slice(0, -1) ] })
    }
  }, [ inputs.choices ])
  
  const addPoll = async e => {
    console.log(inputs, { ...inputs, choices: inputs.choices.filter(choice => choice !== '') })
    e.preventDefault()
    const response = await fetch('http://141.147.1.251:5000/api/v1/poll/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify({ ...inputs, choices: inputs.choices.filter(choice => choice !== '') })
    })
    const data = await response.json()
    console.log(response, data)

    if(data.success) {
      reset()
      Router.reload()
    } 
  }

  const reset = () => {
    setInputs({
      title: '',
      description: '',
      choices: [''],
    })
    setErrors({
      title: '',
      description: '',
      choices: [''],
    })
    onClickBackdrop()
  }

  const isDisabled = () => 
    inputs.title.length < 6 || inputs.title.length > 60 || !inputs.title.match('^[\\w\\s]+$') || 
    inputs.description.length < 6 || inputs.description.length > 100 ||
    inputs.choices.length < 3 || inputs.choices.filter(choice => choice !== '').some(choice => choice.length < 6 || choice.length > 60)

  return (
    <Modal open={open} onClickBackdrop={onClickBackdrop} {...args}>
      <Modal.Header className='flex justify-between'>
        <p className="font-bold text-2xl">Stwórz Ankietę</p>
        <Button size='sm' onClick={reset} color='primary'>x</Button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={addPoll} className='flex flex-col gap-y-4'>
          <Input
            type='text'
            placeholder='Tytuł'
            value={inputs.title}
            onChange={e => setInputs({ ...inputs, title: e.target.value })}
            onBlur={() => setErrors({ ...errors, title: 
              inputs.title.length < 6 
              ? 'Tytuł za krótki (<6)'
              : inputs.title.length > 60 
              ? 'Tytuł za długi (>60)' 
              : !inputs.title.match('^[\\w\\s]+$')
              ? 'Tytuł nieprawidłowy'
              : '' 
            })}
            error={{ valid: false, message: errors.title }}
          />
          <Input
            type='textarea'
            placeholder='Opis'
            value={inputs.description}
            onChange={e => setInputs({ ...inputs, description: e.target.value })}
            onBlur={() => setErrors({ ...errors, description: 
              inputs.description.length < 6
              ? 'Opis za krótki (<6)'
              : inputs.description.length > 100
              ? 'Opis za długi (>100)'
              : ''
            })}
            error={{ valid: false, message: errors.description }}
          />
          {inputs.choices.map((choice, i) => (
            <Input
              key={i}
              type='text'
              placeholder={`${i + 1}. Opcja`}
              value={choice}
              onChange={e => {
                let newChoices = [ ...inputs.choices ]
                newChoices[i] = e.target.value
                setInputs({ ...inputs, choices: [ ...newChoices ] })
              }}
              onBlur={() => {
                let newErrors = [ ...errors.choices ]
                newErrors[i] = choice.length < 6
                  ? 'Opcja za krótka (<6)'
                  : choice.length > 60
                  ? 'Opcja za długa (>60)'
                  : ''
                setErrors({ ...errors, choices: [ ...newErrors ] })
              }}
              error={{ valid: false, message: errors.choices[i] }}
            />
          ))}
          <Button color='primary' disabled={isDisabled()}>Stwórz</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default PollModal