import React, { useEffect, useRef } from 'react'

export default function ToggleSidebar({ children, visible, setVisible }) {
  const ref = useRef()

  useEffect(() => {
    window.onclick = (e) => {
      if(e.target.contains(ref.current) && e.target === ref.current) {
        setVisible(false)
      }
    }
  }, [])
  
  return (
    <>
      {visible && <div ref={ref} className='fixed top-0 left-0 w-full h-screen bg-black opacity-70'></div>}
      <div className={`fixed top-0 left-0 w-2/5 bg-white border-r border-gray-400 h-screen transition ease-in-out duration-300 ${visible ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
        {children}
      </div>
    </>
  )
}
