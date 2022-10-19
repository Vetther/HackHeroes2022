import { useContext, useState } from "react"
import { Button } from "react-daisyui"
import Link from "next/link"

import AuthContext from "../contexts/auth"

import Box from "../components/Box"
import Input from "../components/Input"

const Login = () => {
  const [ input, setInput ] = useState({ username: '', password: '' })
  const { login } = useContext(AuthContext)

  return (
    <div className='flex justify-center items-center h-screen'>
      <Box lg='w-1/2' className='w-2/3'>
        <p className="font-bold text-3xl text-primary mb-12">Logowanie</p>
        <form className='flex flex-col gap-y-8' onSubmit={e => { login(input.username, input.password); e.preventDefault() }}>
          <Input 
            type='text' 
            placeholder='Nazwa Użytkownika lub Email' 
            value={input.username} 
            onChange={e => setInput({ ...input, username: e.target.value })} 
          />
          <Input 
            type='password' 
            placeholder='Hasło' 
            value={input.password} 
            onChange={e => setInput({ ...input, password: e.target.value })} 
            autoComplete='on' 
          />
          <Button color='primary'>Zaloguj</Button>
          <p>Nie masz konta? <Link href='/register'><a className='text-violet-300 hover:text-violet-400'>Zarejestruj się</a></Link></p>
        </form>
      </Box>
    </div>
  )
}

export default Login