import { useContext, useState, useEffect } from "react"
import { Button } from "react-daisyui"
import Link from "next/link"

import AuthContext from "../contexts/auth"
import AlertContext from "../contexts/alert"

import Box from "../components/Box"
import Input from "../components/Input"

const Login = () => {
  const [ inputs, setInputs ] = useState({ username: '', password: '' })
  const [ errors, setErrors ] = useState({
    username: { valid: false, message: '' },
    password: { valid: false, message: '' },
  })
  const { login } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)

  const isCorrectUsername = () => {
    if(inputs.username.length < 3) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika lub Email za krótki (<3)' } })
    }
    else if(inputs.username.length > 320) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika lub Email za długi (>320)' } })
    }
    else {
      setErrors({ ...errors, username: { valid: true, message: '' } })
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
  
  const submitLogin = async e => {
    e.preventDefault()
    if(!await login(inputs.username, inputs.password)) {
      reset()
      setAlert({visible: true, type: 'error', message: 'Podane dane są nieprawidłowe'})
    }
  }

  const isDisabled = () => {
    return !errors.username.valid || !errors.password.valid
  }

  const reset = () => {
    setInputs({ username: '', password: '' })
    setErrors({ username: { valid: false, message: '' }, password: { valid: false, message: '' } })
  }

  useEffect(() => isCorrectUsername(), [inputs.username])
  useEffect(() => isCorrectPassword(), [inputs.password])

  return (
    <div className='flex justify-center items-center h-screen'>
      <Box className='lg:w-1/2 w-3/5'>
        <p className="font-bold text-3xl text-primary mb-12">Logowanie</p>
        <form className='flex flex-col gap-y-8' onSubmit={submitLogin}>
          <Input
            error={errors.username}
            type='text' 
            placeholder='Nazwa Użytkownika lub Email' 
            value={inputs.username} 
            onChange={e => { setInputs({ ...inputs, username: e.target.value }); isCorrectUsername() }} 
          />
          <Input
            error={errors.password} 
            type='password' 
            placeholder='Hasło' 
            value={inputs.password} 
            onChange={e => { setInputs({ ...inputs, password: e.target.value }); isCorrectPassword() }} 
            autoComplete='on'
          />
          <Button color='primary' disabled={isDisabled()}>Zaloguj</Button>
          <p>Nie masz konta? <Link href='/register'><a className='text-violet-300 hover:text-violet-400'>Zarejestruj się</a></Link></p>
        </form>
      </Box>
    </div>
  )
}

export default Login