import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [ tokens, setTokens ] = useState(null)
  const [ user, setUser ] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('tokens')) {
      setTokens(JSON.parse(localStorage.getItem('tokens')))
      setUser(jwt_decode(localStorage.getItem('tokens')))
    }
  }, [])

  const login = async (username, password) => {
    const response = await fetch('http://141.147.1.251:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    const data = await response.json()
    console.log(response, data);
    if(data.success !== undefined) {
      return false
    }
    else{
      setTokens(data)
      setUser(jwt_decode(data.access_token))
      localStorage.setItem('tokens', JSON.stringify(data))
      router.push('/events')
      return true
    } 
  }

  const logout = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('tokens')
    router.push('/login')
  }

  const data = {
    tokens: tokens,
    user: user,
    login: login,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={data}>
      { children }
    </AuthContext.Provider>
  )
}
