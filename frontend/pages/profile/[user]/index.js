import { useContext } from "react"

import AuthContext from '../../../contexts/auth'

const User = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>User</div>
  )
}

export default User