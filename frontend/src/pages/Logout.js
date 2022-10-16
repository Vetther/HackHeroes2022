import React, { useContext } from 'react'
import AuthContext from '../AuthContext'

export default function Logout() {
  const { logout } = useContext(AuthContext)

  logout()

  return (
    <div>Logout</div>
  )
}
