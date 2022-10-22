import {useContext, useEffect} from "react"

import AuthContext from "../contexts/auth"

const Logout = () => {

  const { logout } = useContext(AuthContext)

  useEffect(() => logout(), [])

  return (
    <></>
  )
}

export default Logout