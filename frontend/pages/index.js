import React, { useContext } from 'react'
import { Hero } from 'react-daisyui'
import jwt_decode from 'jwt-decode'
import Router from 'next/router'

import AuthContext from '../contexts/auth'

export default function Home() {
  const { tokens } = useContext(AuthContext)

  // if(tokens) {
  //   Router.push(`/profile/${jwt_decode(tokens.access_token).sub}`)
  // }

  return (
      <>
          <div className="hero min-h-screen bg-base-200">
              <div className="hero-content flex-col lg:flex-row-reverse">
                  <img src="/event2.svg" className="max-w-sm rounded-lg"/>
                  <div>
                      <h1 className="text-5xl font-bold">CitizenHub</h1>
                      <h3 className="text-2xl font-semibold">Twoje centrum wydarzeń</h3>
                      <p className="py-6">Witamy Cię na naszej stronie internetowej. Możesz tu przeglądać wydarzenia, tworzyć ankiety, śledzić informacje ze świata oraz wiele więcej! Zaloguj się aby uzyskać wszystkie funkcjonalności</p>
                      <button className="btn btn-primary" onClick={() => Router.push("/login")}>zaloguj się</button>
                  </div>
              </div>
          </div>
      </>
  )
}
