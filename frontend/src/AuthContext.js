import React, { useState, createContext } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  const navigate = useNavigate()

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

    if(response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access_token))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/events')
    }
  }

  const updateToken = async () => {
    
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    login: login,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
