import { useContext } from "react"

import AuthContext from "../contexts/auth"

const Logout = () => {
  const { logout } = useContext(AuthContext)

  logout()

  return (
    <></>
  )
}

export default Logout