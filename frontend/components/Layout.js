import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className='lg:flex bg-base-200 min-h-screen'>
      <Sidebar />
      <div className="w-full min-h-screen">
        { children }
      </div>
    </div>
  )
}

export default Layout