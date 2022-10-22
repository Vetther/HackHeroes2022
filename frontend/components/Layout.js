import { AlertProvider } from "../contexts/alert"

import Sidebar from "./Sidebar"
import Alert from "./Alert"

const Layout = ({ children }) => {
  return (
    <div className='lg:flex bg-base-200 min-h-screen'>
      <Sidebar />
      <AlertProvider>
        <div className="w-full min-h-screen">
          <Alert />
          { children }
        </div>
      </AlertProvider>
    </div>
  )
}

export default Layout