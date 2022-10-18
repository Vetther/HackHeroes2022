import { Button } from 'react-daisyui'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Alert({ error, setVisible }) {
  const errors = {
    '403': 'Nieprawidłowe dane',
    'USERNAME_IS_NULL': 'Nazwa Użytkownika jest pusta',
    'EMAIL_IS_NULL': 'Email jest pusty',
    'PASSWORD_IS_NULL': 'Hasło jest puste',
    'INVALID_USERNAME': 'Nieprawidłowa Nazwa Użytkownika',
    'INVALID_EMAIL': 'Nieprawidłowy Email',
    'INVALID_PASSWORD': 'Nieprawidłowe Hasło',
    'USERNAME_EXISTS': 'Nazwa Użytkownika już istnieje',
    'EMAIL_EXISTS': 'Email już istnieje',
    'AUTH_ERROR': 'Użytkownik nie zalogowany',
    'EVENT_NOT_INTERESTED': 'Nie można zrezygnować - Użytkownik nie dołączył',
    'EVENT_ALREADY_INTERESTED': 'Nie można dołączyć - Użytkownik już dołączył',
    'EVENT_CREATOR_ERROR': 'Nie można dołączyć - Użytkownik jest właścicielem',
  }

  return (
    <div className={`flex justify-between fixed lg:inset-x-1/3 inset-x-[12.5%] lg:w-1/2 sm:w-3/4 transition ease-in-out duration-300 ${error !== '' ? 'translate-y-0' : 'translate-y-[-200%]'} p-3 border border-base-300 bg-red-400 rounded-lg mt-4 drop-shadow-md`}>
      <div className='flex items-center gap-x-3'>
        <FontAwesomeIcon icon={faTriangleExclamation} style={{width: 30, height: 30}} />
        <p>{errors[error]}</p>
      </div>
      <Button color='ghost' onClick={() => setVisible('')}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  )
}
