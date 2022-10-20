import { useContext, useState, useEffect, useRef } from 'react'
import { Button } from 'react-daisyui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import WidthContext from '../contexts/width'

import SidebarBody from './SidebarBody'

const Sidebar = () => {
  const windowWidth = useContext(WidthContext)
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  const range = 1024  // When the sidebar becomes toggleable

  useEffect(() => {
    window.onclick = e => {
      if(e.target.contains(ref.current) && e.target === ref.current) {
        setVisible(false)
      }
    }
  }, [])

  useEffect(() => {
    if(windowWidth >= range) {
      setVisible(false)
    }
  }, [windowWidth])

  return (
    windowWidth >= range ? 
      <SidebarBody /> 
    :
      <>
        <Button color='primary' className='fixed top-2 left-2' onClick={() => setVisible(true)}>
          <FontAwesomeIcon icon={faBars} size='xl' />
        </Button>
        {visible && <div ref={ref} className="fixed top-0 left-0 w-full min-h-screen bg-black opacity-70 z-10"></div>}
        <div className={`fixed top-0 left-0 z-10 transition ease-in-out duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarBody />
        </div>
      </>
  )
}

export default Sidebar