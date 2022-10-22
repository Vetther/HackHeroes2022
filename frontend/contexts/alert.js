import { createContext, useState } from 'react'

const AlertContext = createContext()

export default AlertContext

export const AlertProvider = ({ children }) => {
  const [ alert, setAlert ] = useState({
    visible: false,
    type: '',
    message: '',
  })

  return (
    <AlertContext.Provider 
      value={{ alert: alert, setAlert: setAlert}}
    >
      { children }
    </AlertContext.Provider>
  )
}