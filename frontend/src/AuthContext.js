import React, { useState, createContext } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Alert } from 'react-daisyui'

const AuthContext = createContext()

export default AuthContext

export function AuthProvider({ children, setAlert }) {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  const navigate = useNavigate()
  const location = useLocation()

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
    if(response.ok) {
      const data = await response.json()

      setAuthTokens(data)
      setUser(jwt_decode(data.access_token))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/events')
    }
    else {
      setAlert(response.status)
      return true  // resets inputs when invalid
    }
  }

  /* const updateToken = async () => {

  } */

  useEffect(() => {
    if (authTokens && jwt_decode(authTokens.access_token).exp < Date.now() / 1000) {
      logout()
    }
  }, [location.pathname])
  
  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAlert: setAlert,
    login: login,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
 