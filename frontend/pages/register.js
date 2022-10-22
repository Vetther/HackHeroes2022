import { useContext, useState } from "react"
import { Button } from "react-daisyui"
import Link from "next/link"

import AuthContext from "../contexts/auth"
import AlertContext from '../contexts/alert'

import Box from "../components/Box"
import Input from "../components/Input"

const Register = () => {
  const [ inputs, setInputs ] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [ errors, setErrors ] = useState({
    username: { valid: false, message: '' },
    email: { valid: false, message: '' },
    password: { valid: false, message: '' },
  })
  const { login } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)

  const register = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      })
    })
    const data = await response.json()

    if(data.success) {
      login(inputs.username, inputs.password)
      setAlert({ visible: true, type: 'success', message: 'Pomyślnie utworzono konto' })
    }
    else {
      const errors = {
        'USERNAME_IS_NULL': 'Nazwa Użytkownika jest pusta',
        'EMAIL_IS_NULL': 'Email jest pusty',
        'PASSWORD_IS_NULL': 'Hasło jest puste',
        'INVALID_USERNAME': 'Nazwa Użytkownika jest nieprawidłowa',
        'INVALID_EMAIL': 'Email jest nieprawidłowy',
        'INVALID_PASSWORD': 'Hasło jest nieprawidłowe',
        'USERNAME_EXISTS': 'Nazwa Użytkownika już istnieje',
        'EMAIL_EXISTS': 'Email już istnieje',
      }

      setAlert({ visible: true, type: 'error', message: errors[data.error] })
      reset()
    }
  }

  const isCorrectUsername = () => {
    if(inputs.username.length < 4) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika za krótka (<4)' } })
    }
    else if(inputs.username.length > 20) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika za długa (>20)' } })
    }
    else if(!inputs.username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")) {
      setErrors({ ...errors, username: { valid: false, message: 'Błędna Nazwa Użytkownika' } })
    }
    else {
      setErrors({ ...errors, username: { valid: true, message: '' } })
    }
  }

  const isCorrectEmail = () => {
    if(inputs.email.length < 3) {
      setErrors({ ...errors, email: { valid: false, message: 'Email za krótki (<3)' } })
    }
    else if(inputs.email.length > 320) {
      setErrors({ ...errors, email: { valid: false, message: 'Email za długi (>320)' } })
    }
    else if(!inputs.email.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")) {
      setErrors({ ...errors, email: { valid: false, message: 'Błędny Email' } })
    }
    else {
      setErrors({ ...errors, email: { valid: true, message: '' } })
    }
  }

  const isCorrectPassword = () => {
    if(inputs.password.length < 6) {
      setErrors({ ...errors, password: { valid: false, message: 'Hasło za krótkie (<6)' } })
    }
    else if(inputs.password.length > 100) {
      setErrors({ ...errors, password: { valid: false, message: 'Hasło za długie (>100)' } })
    }
    else {
      setErrors({ ...errors, password: { valid: true, message: '' } })
    }
  }

  const isDisabled = () => {
    return !errors.username.valid || !errors.email.valid || !errors.password.valid
  }

  const reset = () => {
    setInputs({ ...Object.fromEntries(Object.keys(inputs).map(input => [ input, '' ])) })
    setErrors({ ...Object.fromEntries(Object.keys(errors).map(error => [ error, { valid: false, message: '' } ])) })
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Box className='lg:w-1/2 w-3/5'>
        <p className="font-bold text-3xl text-primary mb-12">Rejestracja</p>
        <form className='flex flex-col gap-y-8' onSubmit={e => { register(); e.preventDefault() }}>
          <Input 
            error={errors.username} 
            type='text' 
            placeholder='Nazwa Użytkownika' 
            value={inputs.username} 
            onChange={e => { setInputs({ ...inputs, username: e.target.value }); isCorrectUsername() }} 
          />
          <Input
            error={errors.email} 
            type='email' 
            placeholder='Email' 
            value={inputs.email} 
            onChange={e => { setInputs({ ...inputs, email: e.target.value }); isCorrectEmail() }} 
          />
          <Input
            error={errors.password} 
            type='password' 
            placeholder='Hasło' 
            value={inputs.password} 
            onChange={e => { setInputs({ ...inputs, password: e.target.value }); isCorrectPassword() }} 
            autoComplete='on'
          />
          <Button color='primary' disabled={isDisabled()}>Zarejestruj</Button>
          <p>Masz już konto? <Link href='/login'><a className='text-violet-300 hover:text-violet-400'>Zaloguj się</a></Link></p>
        </form>
      </Box>
    </div>
  )
}

export default Register