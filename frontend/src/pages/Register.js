import React, { useState, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'

import RegisterInput from '../components/RegisterInput'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState({valid: false, message: ''})
  const [emailError, setEmailError] = useState({valid: false, message: ''})
  const [passwordError, setPasswordError] = useState({valid: false, message: ''})
  const { login, setAlert } = useContext(AuthContext)

  const register = async () => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      })
    })
    const data = await response.json()

    if(response.status === 200) {
      login(username, password)
    }
    else if(response.status === 400) {
      setAlert(data.error)
    }
  }

  const isCorrectUsername = () => {
    if(username.length < 4) {
      setUsernameError({valid: false, message: 'Nazwa Użytkownika za krótka (<4)'})
    }
    else if(username.length > 20) {
      setUsernameError({valid: false, message: 'Nazwa Użytkownika za długa (>20)'})
    }
    else if(!username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")) {
      setUsernameError({valid: false, message: 'Błędna Nazwa Użytkownika'})
    }
    else {
      setUsernameError({valid: true, message: ''})
    }
  }

  const isCorrectEmail = () => {
    if(email.length < 3) {
      setEmailError({valid: false, message: 'Email za krótki (<3)'})
    }
    else if(email.length > 320) {
      setEmailError({valid: false, message: 'Email za długi (>320)'})
    }
    else if(!email.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")) {
      setEmailError({valid: false, message: 'Błędny Email'})
    }
    else {
      setEmailError({valid: true, message: ''})
    }
  }

  const isCorrectPassword = () => {
    if(password.length < 6) {
      setPasswordError({valid: false, message: 'Hasło za krótkie (<6)'})
    }
    else if(password.length > 100) {
      setPasswordError({valid: false, message: 'Hasło za długie (>100)'})
    }
    else {
      setPasswordError({valid: true, message: ''})
    }
  }

  const isDisabled = () => {
    return !usernameError.valid || !emailError.valid || !passwordError.valid
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="md:w-2/5 w-2/3 border border-base-300 bg-base-100 rounded-lg px-8 py-6">
        <p className="font-bold text-3xl text-primary mb-12">Rejestracja</p>
        <form className='flex flex-col gap-y-8' onSubmit={e => {register(); e.preventDefault()}}>
          <div>
            <RegisterInput type='text' placeholder='Nazwa Użytkownika' value={username} onChange={e => setUsername(e.target.value)} onBlur={isCorrectUsername} />
            {!usernameError.valid && <p className='text-red-700'>{usernameError.message}</p>}
          </div>
          <div>
            <RegisterInput type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} onBlur={isCorrectEmail} />
            {!emailError.valid && <p className='text-red-700'>{emailError.message}</p>}
          </div>
          <div>
            <RegisterInput type='password' autoComplete='on' placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} onBlur={isCorrectPassword} />
            {!passwordError.valid && <p className='text-red-700'>{passwordError.message}</p>}
          </div>
          <Button color='primary' disabled={isDisabled()}>Zarejestruj</Button>
          <p>Masz już konto? <Link to='/login' className='text-violet-300 hover:text-violet-400'>Zaloguj się</Link></p>
        </form>
      </div>
    </div>
  )
}
