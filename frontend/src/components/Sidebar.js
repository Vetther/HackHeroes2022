import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faInfo,
    faInfoCircle,
    faRightToBracket,
    faSquarePollVertical
} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

export default function Sidebar() {
  const location = useLocation()

  const main_category = {
      0: {
          name: 'Wydarzenia',
          path: '/events',
          icon: <FontAwesomeIcon icon={faCalendar} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      1: {
          name: 'Ankiety',
          path: '/polls',
          icon: <FontAwesomeIcon icon={faSquarePollVertical} style={{marginRight: 4, width: 20, height: 20}}/>
      }
  }

  const user_category = {
      0: {
          name: 'O nas',
          path: '/onas',
          icon: <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      1: {
          name: 'Zaloguj się',
          path: '/login',
          icon: <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: 4, width: 20, height: 20}}/>
      },
  }

  function printCategory(array) {
      return (
          Object.entries(array).map(page => (
              <li key={page[1]["path"]}
                  className={page[1]["path"] !== location.pathname ? 'text-gray-500 mb-1 pr-4' : 'mb-1 pr-4 border-r-4 border-primary'}>

                  <Link to={page[1]["path"]} className={'p-2'}>
                      <span className={page[1]["path"] !== location.pathname ? 'text-gray-500 flex' : 'text-primary flex'}>
                          {page[1]["icon"]}
                      </span>

                      <span>{page[1]["name"]}</span>
                  </Link>
              </li>
          ))
      )
  }

  return (
    <div className="bg-base-100 flex flex-col w-full h-full">
      <div className='flex p-6 mb-10'>
        <p className="font-bold text-2xl text-primary">JA-Obywatel</p>
      </div>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400">główne dane</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(main_category)} </ul>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400 mt-3">informacje o użytkowniku</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(user_category)} </ul>
    </div>
  )
}
