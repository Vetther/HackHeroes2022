import { AlertProvider } from "../contexts/alert"

import Sidebar from "./Sidebar"
import Alert from "./Alert"
import React from "react";

const Layout = ({ children }) => {

    const sidebar = React.useMemo( () => <Sidebar/>, [] );

  return (
    <div className='lg:flex bg-base-200 min-h-screen'>
        {sidebar}
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