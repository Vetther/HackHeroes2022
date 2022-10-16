import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from 'react-daisyui'
import { useJwt } from 'react-jwt'

import Sidebar from './components/Sidebar'
import ToggleSidebar from './components/ToggleSidebar'
import { AuthProvider } from './AuthContext'

import Events from './pages/Events'
import EventInfo from './pages/EventInfo'
import Polls from './pages/Polls'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

import bb from './bb.jpg'
import {themeChange} from "theme-change";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [visible, setVisible] = useState(false)
  const hideSidebar = 1024  // Amount of pixels when to hide sidebar

  const resize = () => {
    setWindowWidth(window.innerWidth)
    if(windowWidth >= hideSidebar) {
      setVisible(false)
    }
  }

  useEffect(() => {
    themeChange(false)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const [events, setEvents] = useState([
    {
      id: 0,
      img: bb,
      title: 'Urodziny Macieja',
      address: 'Katowicka 10, Bielsko-Biala',
      creator: 'Maciej',
      summary: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      description: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      datetime: '20/10/2022 21:30' ,
      participating: 54,
    },
    {
      id: 1,
      img: bb,
      title: 'Urodziny Macieja',
      address: 'Katowicka 10, Bielsko-Biala',
      creator: 'Maciej',
      summary: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      description: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      datetime: '20/10/2022 21:30' ,
      participating: 54,
    },
    {
      id: 2,
      img: bb,
      title: 'Urodziny Macieja',
      address: 'Katowicka 10, Bielsko-Biala',
      creator: 'Maciej',
      summary: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      description: 'Zapraszam wszystkich swietowac urodziny Macka! Dluzszy opis danego elementu test dwoch linii',
      datetime: '20/10/2022 21:30' ,
      participating: 54,
    },
  ])

  const login = (username, password) => {
    if(username && password) {
      fetch('http://141.147.1.251:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      .then(response => response.text())
      .then(data => {
        if(data) {
          data = JSON.parse(data)
          localStorage.setItem('access_token', data.access_token)
          console.log(data)
        }
      })
    }
  }

  return (
    <AuthProvider>
      <div className='flex w-full h-screen bg-base-200'>
        {(windowWidth >= hideSidebar && !visible) &&
          <div className="w-1/6 border-r border-base-300">
            <Sidebar />
          </div>
        }
        <div className='w-full'>
          {windowWidth < hideSidebar &&
            <Button color='primary' className='ml-1.5 mt-1.5' onClick={() => setVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path fill='#FFFFFF' d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
              </svg>
            </Button>
          }
          <Routes>
            <Route exact path='/events' element={<Events events={events} setEvents={setEvents} />} />
            <Route path='/event/:id' element={<EventInfo events={events} />} />
            <Route exact path='/polls' element={<Polls />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/logout' element={<Logout />} />
          </Routes>
        </div>
      </div>
      <ToggleSidebar visible={visible} setVisible={setVisible}>
        <Sidebar />
      </ToggleSidebar>
      </AuthProvider>
  )
}