import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from 'react-daisyui'

import Sidebar from './components/Sidebar'
import ToggleSidebar from './components/ToggleSidebar'
import { AuthProvider } from './AuthContext'

import Events from './pages/Events'
import EventInfo from './pages/EventInfo'
import Polls from './pages/Polls'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

import {themeChange} from "theme-change";
import AboutUs from "./pages/AboutUs";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [visible, setVisible] = useState(false)
  const hideSidebar = 1024  // Amount of pixels when to hide sidebar

  useEffect(() => {
    themeChange(false)
    
    const resize = () => {
      setWindowWidth(window.innerWidth)
      if(windowWidth >= hideSidebar) {
        setVisible(false)
      }
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [windowWidth])

  return (
    <AuthProvider>
      <div className='flex w-full bg-base-200'>
        {(windowWidth >= hideSidebar && !visible) &&
          <div className="w-1/6 border-r border-base-300">
            <Sidebar />
          </div>
        }
        <div className='w-full pb-4' style={{minHeight: '100vh'}}>
          {windowWidth < hideSidebar &&
            <Button color='primary' className='ml-1.5 mt-1.5' onClick={() => setVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path fill='#FFFFFF' d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
              </svg>
            </Button>
          }
          <Routes>
            <Route exact path='/events' element={<Events />} />
            <Route path='/event/:id' element={<EventInfo />} />
            <Route exact path='/polls' element={<Polls />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/logout' element={<Logout />} />
            <Route exact path='/aboutus' element={<AboutUs />} />
          </Routes>
        </div>
      </div>
      <ToggleSidebar visible={visible} setVisible={setVisible}>
        <Sidebar />
      </ToggleSidebar>
      </AuthProvider>
  )
}