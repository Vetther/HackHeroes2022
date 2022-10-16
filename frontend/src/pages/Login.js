import React, { useState, useContext } from 'react'
import AuthContext from '../AuthContext'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [usernameEmail, setUsernameEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputClass = 'border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2'

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="md:w-2/5 w-2/3 border border-base-300 bg-base-100 rounded-lg px-8 py-6">
        <p className="font-bold text-3xl text-primary mb-12">Logowanie</p>
        <form className="flex flex-col gap-y-8" onSubmit={login}>
          <input type="text" name='username' placeholder='Nazwa Użytkownika lub Email' value={usernameEmail} onChange={e => setUsernameEmail(e.target.value)} className={inputClass} />
          <input type="password" name='password' autoComplete="on" placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          <Button color='primary'>Zaloguj</Button>
          <p>Nie masz konta? <Link to='/register' className='text-violet-300 hover:text-violet-400'>Zarejestruj się</Link></p>
        </form>
        {/* <div className="flex flex-col gap-y-8">
          <input type="text" name='login' placeholder='Nazwa Użytkownika lub Email' value={usernameEmail} onChange={e => setUsernameEmail(e.target.value)} className={inputClass} />
          <input type="password" name='password' autoComplete="on" placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          <Button color='primary' onClick={login}>Zaloguj</Button>
          <p>Nie masz konta? <Link to='/rejestracja' className='text-violet-300 hover:text-violet-400'>Zarejestruj się</Link></p>
        </div> */}
      </div>
    </div>
  )
}
