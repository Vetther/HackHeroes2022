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

export default function Sidebar() {
  const location = useLocation()

  const pages = {
      0: {
          name: 'Wydarzenia',
          path: '/events',
          icon: <FontAwesomeIcon icon={faCalendarDays} style={{marginRight: 10, width: 25, height: 25}}/>
      },
      1: {
          name: 'Ankiety',
          path: '/polls',
          icon: <FontAwesomeIcon icon={faSquarePollVertical} style={{marginRight: 10, width: 25, height: 25}}/>
      },
      3: {
          name: 'O nas',
          path: '/onas',
          icon: <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: 10, width: 25, height: 25}}/>
      },
      4: {
          name: 'Zaloguj się',
          path: '/login',
          icon: <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: 10, width: 25, height: 25}}/>
      },
  }

  return (
    <div className="flex flex-col justify-between w-full h-2/4">
      <div className='flex items-center justify-center p-6'>
        <p className="font-bold text-2xl text-primary">Logo</p>
      </div>

        <ul className="menu bg-base-100 w-100 p-2 font-semibold text-lg xl:pl-6 pl-2">
          {Object.entries(pages).map(page => (
            <li key={page[1]["path"]} className={page[1]["path"] !== location.pathname ? 'text-gray-600 mb-3' : 'mb-3'}>
              <Link to={page[1]["path"]}>

                  <span className={page[1]["path"] !== location.pathname ? 'text-gray-600 ' : 'text-primary'}>
                      {page[1]["icon"]}
                  </span>

                  <span style={{marginBottom: 6}}>{page[1]["name"]}</span>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}
