import { useContext, useState } from "react"
import { Button } from "react-daisyui"
import Link from "next/link"

import AuthContext from "../contexts/auth"

import Box from "../components/Box"
import Input from "../components/Input"

const Register = () => {
  const [ input, setInput ] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [ errors, setErrors ] = useState({
    username: { valid: false, message: '' },
    email: { valid: false, message: '' },
    password: { valid: false, message: '' },
  })
  const { login } = useContext(AuthContext)

  const register = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: input.username,
        email: input.email,
        password: input.password,
      })
    })
    const data = await response.json()

    if(response.status === 200) {
      login(input.username, input.password)
    }
  }

  const isCorrectUsername = () => {
    if(input.username.length < 4) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika za krótka (<4)' } })
    }
    else if(input.username.length > 20) {
      setErrors({ ...errors, username: { valid: false, message: 'Nazwa Użytkownika za długa (>20)' } })
    }
    else if(!input.username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")) {
      setErrors({ ...errors, username: { valid: false, message: 'Błędna Nazwa Użytkownika' } })
    }
    else {
      setErrors({ ...errors, username: { valid: true, message: '' } })
    }
  }

  const isCorrectEmail = () => {
    if(input.email.length < 3) {
      setErrors({ ...errors, email: { valid: false, message: 'Email za krótki (<3)' } })
    }
    else if(input.email.length > 320) {
      setErrors({ ...errors, email: { valid: false, message: 'Email za długi (>320)' } })
    }
    else if(!input.email.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")) {
      setErrors({ ...errors, email: { valid: false, message: 'Błędny Email' } })
    }
    else {
      setErrors({ ...errors, email: { valid: true, message: '' } })
    }
  }

  const isCorrectPassword = () => {
    if(input.password.length < 6) {
      setErrors({ ...errors, password: { valid: false, message: 'Hasło za krótkie (<6)' } })
    }
    else if(input.password.length > 100) {
      setErrors({ ...errors, password: { valid: false, message: 'Hasło za długie (>100)' } })
    }
    else {
      setErrors({ ...errors, password: { valid: true, message: '' } })
    }
  }

  const isDisabled = () => {
    return !errors.username.valid || !errors.email.valid || !errors.password.valid
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
            value={input.username} 
            onChange={e => setInput({ ...input, username: e.target.value })} 
            onBlur={isCorrectUsername} 
          />
          <Input 
            error={errors.email} 
            type='email' 
            placeholder='Email' 
            value={input.email} 
            onChange={e => setInput({ ...input, email: e.target.value })} 
            onBlur={isCorrectEmail} 
          />
          <Input 
            error={errors.password} 
            type='password' 
            placeholder='Hasło' 
            value={input.password} 
            onChange={e => setInput({ ...input, password: e.target.value })} 
            onBlur={isCorrectPassword} 
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