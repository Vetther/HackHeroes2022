import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Tab({ title, data }) {
  const location = useLocation()

  return (
    <div>
      <span className="text-xs xl:pl-4 pl-2 ml-2 uppercase text-gray-400">{title}</span>
      <ul className="menu w-100 p-2 font-medium text-sm xl:pl-4 pl-2">
        {data.map(tab => (
          <li 
            key={tab.path} 
            className={`${tab.path !== location.pathname ? 'text-gray-500' : 'border-r-4 border-primary'} mb-1 pr-4`}
          >
            <Link to={tab.path} className='p-2'>
              <span className={`flex ${tab.path !== location.pathname ? 'text-gray-500' : 'text-primary'}`}>
                {tab.icon}
              </span>
              <span>{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
