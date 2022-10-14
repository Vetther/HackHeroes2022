import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from 'react-daisyui'

import Sidebar from './components/Sidebar'
import ToggleSidebar from './components/ToggleSidebar'

import Events from './pages/Events'
import Polls from './pages/Polls'

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [visible, setVisible] = useState(false)

  const resize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <>
      <div className='flex w-full h-screen bg-gray-100'>
        {windowWidth >= 768 &&
          <div className="w-1/6 bg-white border-r border-gray-400">
            <Sidebar />
          </div>
        }
        <div className="w-full md:w-5/6">
          {windowWidth < 768 &&
            <Button color='primary' className='ml-1.5 mt-1.5' onClick={() => setVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path fill='#FFFFFF' d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
              </svg>
            </Button>
          }
          <Routes>
            <Route exact path='/events' element={<Events />} />
            <Route exact path='/polls' element={<Polls />} />
          </Routes>
        </div>
      </div>
      <ToggleSidebar visible={visible} setVisible={setVisible}>
        <Sidebar />
      </ToggleSidebar>
    </>
  )
}