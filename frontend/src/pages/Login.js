import React, { useState } from 'react'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'

export default function Login({ login }) {
  const [usernameEmail, setUsernameEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputClass = 'border-b border-gray-300 focus:outline-none focus:border-primary w-full pb-2'

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="md:w-2/5 w-2/3 border border-gray-300 bg-white rounded-lg px-8 py-6">
        <p className="font-bold text-3xl text-primary mb-12">Logowanie</p>
        {/* <form className="flex flex-col gap-y-8" onSubmit={() => login(usernameEmail, password)}>
          <input type="text" placeholder='Nazwa Użytkownika lub Email' value={usernameEmail} onChange={e => setUsernameEmail(e.target.value)} className={inputClass} />
          <input type="password" autoComplete="on" placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          <Button color='primary'>Zaloguj</Button>
          <p>Nie masz konta? <Link to='/register' className='text-violet-300 hover:text-violet-400'>Zarejestruj się</Link></p>
        </form> */}
        <div className="flex flex-col gap-y-8">
          <input type="text" placeholder='Nazwa Użytkownika lub Email' value={usernameEmail} onChange={e => setUsernameEmail(e.target.value)} className={inputClass} />
          <input type="password" autoComplete="on" placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          <Button color='primary' onClick={() => login(usernameEmail, password)}>Zaloguj</Button>
          <p>Nie masz konta? <Link to='/register' className='text-violet-300 hover:text-violet-400'>Zarejestruj się</Link></p>
        </div>
      </div>
    </div>
  )
}
