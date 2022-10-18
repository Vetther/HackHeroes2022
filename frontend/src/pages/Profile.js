import React from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { user } = useParams()

  return (
    <div>{user}</div>
  )
}
