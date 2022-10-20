import { createContext, useState, useEffect } from 'react'

const WidthContext = createContext()

export default WidthContext

export const WidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(undefined)

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', resize)

    resize()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <WidthContext.Provider value={windowWidth}>
      { children }
    </WidthContext.Provider>
  )
}
