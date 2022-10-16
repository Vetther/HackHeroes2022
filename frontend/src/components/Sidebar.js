import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faInfo,
    faInfoCircle,
    faRightToBracket,
    faSquarePollVertical,
    faFlag, faSquarePollHorizontal, faRightFromBracket, faUser, faHandshakeAngle, faHandHoldingHeart
} from "@fortawesome/free-solid-svg-icons";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import { Theme } from 'react-daisyui'

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
      },
      2: {
          name: 'Zrzutki Funduszy',
          path: '/zrzutki',
          icon: <FontAwesomeIcon icon={faHandshakeAngle} style={{marginRight: 4, width: 20, height: 20}}/>
      }
  }

  const user_category = {
      0: {
          name: 'Zaloguj się',
          path: '/login',
          icon: <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: 4, width: 20, height: 20}}/>
      },
  }

    const user_logged_category = {
        0: {
            name: 'Twój Profil',
            path: '/profile',
            icon: <FontAwesomeIcon icon={faUser} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        1: {
            name: 'Twoje Wydarzenia',
            path: '/twoje-wydarzenia',
            icon: <FontAwesomeIcon icon={faCalendarCheck} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        2: {
            name: 'Twoje Ankiety',
            path: '/twoje-ankiety',
            icon: <FontAwesomeIcon icon={faSquarePollHorizontal} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        3: {
            name: 'Twoje Zrzutki',
            path: '/twoje-zrzutki',
            icon: <FontAwesomeIcon icon={faHandHoldingHeart} style={{marginRight: 4, width: 20, height: 20}}/>
        },
        4: {
            name: 'Wyloguj się',
            path: '/wyloguj-sie',
            icon: <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight: 4, width: 20, height: 20}}/>
        }
    }

  const website_category = {
      0: {
          name: 'O nas',
          path: '/o-nas',
          icon: <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: 4, width: 20, height: 20}}/>
      },
      1: {
          name: 'Dane techniczne',
          path: '/dane-techniczne',
          icon: <FontAwesomeIcon icon={faFlag} style={{marginRight: 4, width: 20, height: 20}}/>
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

          <label className="swap swap-rotate ml-3">
              <input type="checkbox" data-toggle-theme="light,dark" data-act-class="ACTIVECLASS"/>

              <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
              </svg>
              <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
              </svg>
          </label>
      </div>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400">główne dane</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(main_category)} </ul>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400 mt-3">informacje o użytkowniku</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(user_category)} </ul>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400 mt-3">informacje o użytkowniku</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(user_logged_category)} </ul>

        <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400 mt-3">informacje o witrynie</span>
        <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2"> {printCategory(website_category)} </ul>
    </div>
  )
}
