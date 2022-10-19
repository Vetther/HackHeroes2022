import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInfoCircle,
  faRightToBracket,
  faSquarePollVertical,
  faFlag, 
  faSquarePollHorizontal, 
  faRightFromBracket, 
  faUser, 
  faHandshakeAngle, 
  faHandHoldingHeart, 
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons"
import { faCalendar, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";

import AuthContext from '../contexts/auth'

import Tab from './Tab'

const SidebarBody = () => {
  const { user } = useContext(AuthContext)

  const categories = {
    'główne dane' : [
        {
            name: 'Wydarzenia',
            path: '/events',
            icon: <FontAwesomeIcon icon={faCalendar} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        {
            name: 'Ankiety',
            path: '/polls',
            icon: <FontAwesomeIcon icon={faSquarePollVertical} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        {
            name: 'Zrzutki Funduszy',
            path: '/zrzutki',
            icon: <FontAwesomeIcon icon={faHandshakeAngle} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        {
            name: 'Wiadomości',
            path: '/news',
            icon: <FontAwesomeIcon icon={faNewspaper} style={{marginRight: 4, width: 20, height: 20}}/>
        },
    ],
    'informacje o użytkowniku': !user ? [
      {
          name: 'Zaloguj się',
          path: '/login',
          icon: <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      /* {
          name: 'Zarejestruj się',
          path: '/register',
          icon: <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: 4, width: 20, height: 20}}/>
      }, */
    ]
    :
    [
      {
          name: `Profil ${user.sub}`,
          path: `/${user.sub}`,
          icon: <FontAwesomeIcon icon={faUser} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      {
          name: 'Twoje Wydarzenia',
          path: `/${user.sub}/events`,
          icon: <FontAwesomeIcon icon={faCalendarCheck} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      {
          name: 'Twoje Ankiety',
          path: `/${user.sub}/polls`,
          icon: <FontAwesomeIcon icon={faSquarePollHorizontal} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      {
          name: 'Twoje Zrzutki',
          path: `/${user.sub}/zrzutki`,
          icon: <FontAwesomeIcon icon={faHandHoldingHeart} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      {
          name: 'Wyloguj się',
          path: '/logout',
          icon: <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight: 4, width: 20, height: 20}}/>
      },
    ],
    'informacje o witrynie': [
        {
            name: 'O nas',
            path: '/about-us',
            icon: <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        {
            name: 'Dane techniczne',
            path: '/dane-techniczne',
            icon: <FontAwesomeIcon icon={faFlag} style={{marginRight: 4, width: 20, height: 20}}/>
        },
    ]
  }

  return (
    <div className='sticky top-0 flex flex-col lg:w-1/6 h-screen bg-base-100 border border-r-base-300'>
      <div className='flex mx-auto p-3 mb-12'>
        <p className="text-2xl font-bold text-primary">CitizenHub.pl</p>
      </div>
      <div className='flex flex-col gap-y-7 ml-2'>
        {Object.entries(categories).map(category => (
          <Tab key={category[0]} title={category[0]} data={category[1]} />
        ))}
      </div>
    </div>
  )
}

export default SidebarBody