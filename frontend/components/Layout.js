import { AlertProvider } from "../contexts/alert"

import Sidebar from "./Sidebar"
import Alert from "./Alert"
import { useMemo } from "react";

const Layout = ({ children }) => {
  const sidebar = useMemo( () => <Sidebar/>, [] );

  return (
    <div className='lg:flex bg-base-200 min-h-screen'>
        {sidebar}
      <AlertProvider>
        <div className="w-full z-20">
          <Alert />
          { children }
        </div>
      </AlertProvider>
    </div>
  )
}

export default Layout