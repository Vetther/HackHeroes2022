import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Drawer } from 'react-daisyui'

import megaphone from '../svgs/megaphone.svg'
import poll from '../svgs/poll.svg'

export default function Sidebar() {
  const location = useLocation()

  const pages = {
    'Wydarzenia': '/events',
    'Ankiety': '/polls',
  }

  return (
    <div className="flex flex-col justify-between w-full h-2/5">
      <div className='flex items-center justify-center p-6'>
        <p className="font-bold text-2xl text-primary">Logo</p>
      </div>
      <div>
        <li className='list-none font-semibold lg:text-2xl md:text-xl text-2xl xl:pl-11 lg:pl-5 md:pl-3 sm:pl-11 pl-5 space-y-6'>
          {Object.entries(pages).map(page => (
            <ul key={page[1]} className={page[1] !== location.pathname ? 'text-gray-500' : 'border-r-4 border-primary'}>
              <Link to={page[1]}>{page[0]}</Link>
            </ul>
          ))}
        </li>
      </div>
    </div>
  )
}
