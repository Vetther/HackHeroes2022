import { useContext } from 'react'
import { Hero } from 'react-daisyui'
import jwt_decode from 'jwt-decode'
import Router from 'next/router'

import AuthContext from '../contexts/auth'

export default function Home() {
  const { tokens } = useContext(AuthContext)

  if(tokens) {
    Router.push(`/profile/${jwt_decode(tokens.access_token).sub}`)
  }

  return (
    <Hero
      style={{
        backgroundImage: {  }
      }}
    >

    </Hero>
  )
}
