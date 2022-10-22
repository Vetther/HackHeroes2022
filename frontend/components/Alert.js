import { useContext } from "react"
import { Button } from "react-daisyui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faCircleExclamation, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

import AlertContext from "../contexts/alert"

const Alert = () => {
  const { alert, setAlert } = useContext(AlertContext)

  const type = {
    success: {
      color: 'bg-green-500/80',
      icon: faCircleCheck,
    },
    error: {
      color: 'bg-red-500/80',
      icon: faCircleExclamation,
    },
    info: {
      color: 'bg-sky-500/80',
      icon: faInfoCircle,
    }
  }[alert.type]

  return (
    <div 
      className={`flex items-center fixed inset-x-0 mx-auto lg:w-1/2 sm:w-2/3 w-3/4 p-3 mt-4 z-20 border border-base-content/10 rounded-lg drop-shadow-md ${type?.color} text-white transition ease-in-out duration-300 ${alert.visible ? 'translate-y-0' : 'translate-y-[-200%]'}`}
    >
      <label className='flex items-center gap-x-2 text-lg font-semibold'>
        {type && <FontAwesomeIcon icon={type?.icon} className='w-8 h-8' />}
        {alert.message}
      </label>
      <Button color='ghost' size='sm' className='ml-auto' onClick={() => setAlert({ visible: false, type: '', message: '' })}>
        <FontAwesomeIcon icon={faX} />
      </Button>
    </div>
  )
}

export default Alert