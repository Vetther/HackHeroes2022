import React from 'react'
import { useLocation } from 'react-router-dom'

export default function EventInfo({ events }) {
  const location = useLocation()
  const event = events[location.pathname.split('/').at(-1)]

  return (
    <div>{event.id}</div>
  )
}
