import React from 'react'
import { Button } from 'react-daisyui'
import { Link } from 'react-router-dom'

export default function Event({ event }) {
  return (
    <div className="md:flex justify-between bg-white rounded-lg p-4 shadow-md">
      <div className='sm:flex'>
        <img src={event.img} alt={event.title} className='rounded-lg object-cover shadow-xl' />
        <div className="flex flex-col justify-between sm:ml-6 mt-1 md:mt-0">
          <div>
            <p className='text-black text-xl font-bold mb-1.5'>{event.title}</p>
            <div className='flex items-center mb-1'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'>
                <path fill='#6b7280' d='M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z'/>
              </svg>
              <p className='text-gray-500 ml-2'>{event.address}</p>
            </div>
            <div className='flex items-center mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width='18' height='18' viewBox="0 0 448 512">
               <path fill='#6b7280' d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
              </svg>
              <p className='text-gray-500 ml-2'>{event.creator}</p>
            </div>
          </div>
          <p className="font-medium pr-3">{event.description}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='md:text-end text-md font-medium my-3 md:my-0'>{event.datetime}</p>
        <div className="flex justify-between">
          <div className='flex items-center mr-6'>
            <svg xmlns="http://www.w3.org/2000/svg" width='20' height='20' viewBox="0 0 485 485">
              <path d="M382.5,69.429c-7.441,0-14.5,1.646-20.852,4.573c-4.309-23.218-24.7-40.859-49.148-40.859 c-7.68,0-14.958,1.744-21.467,4.852C285.641,16.205,265.932,0,242.5,0c-23.432,0-43.141,16.206-48.533,37.995 c-6.508-3.107-13.787-4.852-21.467-4.852c-27.57,0-50,22.43-50,50v122.222c-6.129-2.686-12.891-4.187-20-4.187 c-27.57,0-50,22.43-50,50V354c0,72.233,58.766,131,131,131h118c72.233,0,131-58.767,131-131V119.429 C432.5,91.858,410.07,69.429,382.5,69.429z M402.5,354c0,55.691-45.309,101-101,101h-118c-55.691,0-101-45.309-101-101V251.178 c0-11.028,8.972-20,20-20s20,8.972,20,20v80h30V83.143c0-11.028,8.972-20,20-20s20,8.972,20,20v158.035h30V50 c0-11.028,8.972-20,20-20c11.028,0,20,8.972,20,20v191.178h30V83.143c0-11.028,8.972-20,20-20s20,8.972,20,20v158.035h30v-121.75 c0-11.028,8.972-20,20-20s20,8.972,20,20V354z"/>
            </svg>
            <p className='text-lg ml-1'>{event.participating}</p>
          </div>
          <Link to={`/event/${event.id}`}>
            <Button color='primary'>Zobacz</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
