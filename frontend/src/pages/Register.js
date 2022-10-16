import React, { useState, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [correctUsername, setCorrectUsername] = useState(true)
  const [correctEmail, setCorrectEmail] = useState(true)
  const [correctPassword, setCorrectPassword] = useState(true)
  const {login} = useContext(AuthContext)

  const register = async () => {
    if(username && correctUsername && email && correctEmail && password && correctPassword) {
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

      if(response.status === 200) {
        login()
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="md:w-2/5 w-2/3 border border-base-300 bg-base-100 rounded-lg px-8 py-6">
        <p className="font-bold text-3xl text-primary mb-12">Rejestracja</p>
        {/* <form className="flex flex-col gap-y-8" onSubmit={register}> */}
        <div className='flex flex-col gap-y-8'>
          <div>
            <input
              type="text" 
              placeholder='Nazwa Użytkownika' 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              onBlur={() => setCorrectUsername(username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"))} 
              className='border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2'
            />
            <p className={`text-red-700 ${correctUsername && 'hidden'}`}>Nieprawidłowa Nazwa Użytkownika</p>
          </div>
          <div>
            <input 
              type="email" 
              placeholder='Email' 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              onBlur={() => setCorrectEmail(email.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$") && email.length >= 3 && email.length <= 320)}
              className='border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2'
            />
            <p className={`text-red-700 ${correctEmail && 'hidden'}`}>Nieprawidłowy Email</p>
          </div>
          <div>
            <input 
              type="password" 
              autoComplete="on" 
              placeholder='Hasło' 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              onBlur={() => setCorrectPassword(password.length >= 6 && password.length <= 100)}
              className='border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2'
            />
            <p className={`text-red-700 ${correctPassword && 'hidden'}`}>Nieprawidłowe Hasło</p>
          </div>
          <Button color='primary' onClick={register}>Zarejestruj</Button>
          <p>Masz już konto? <Link to='/logowanie' className='text-violet-300 hover:text-violet-400'>Zaloguj się</Link></p>
        {/* </form> */}
        </div>
      </div>
    </div>
  )
}
