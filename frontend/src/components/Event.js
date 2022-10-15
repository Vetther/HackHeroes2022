import React from 'react'
import {Button, Tooltip} from 'react-daisyui'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHand} from "@fortawesome/free-regular-svg-icons";
import {faLocationDot, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Event({ event }) {
  return (
    <div className="md:flex justify-between bg-white rounded-lg p-4 shadow-md">
      <div className='sm:flex'>
        <img src={event.img} alt={event.title} className='rounded-lg object-cover shadow-xl' />
        <div className="flex flex-col justify-between sm:ml-6 mt-1 md:mt-0">
          <div>
            <p className='text-black text-xl font-bold mb-1.5'>{event.title}</p>
            <div className='flex items-center mb-1'>
              <Tooltip message={'Lokalizacja'} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faLocationDot} className={'mt-1'} style={{color: '#6b7280', width:18, height: 18}}/>
                <p className='text-gray-500 ml-2'>{event.address}</p>
              </Tooltip>
            </div>
            <div className='flex items-center mb-4'>
              <Tooltip message={'Organizator'} position={"left"} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faUser} className={'mt-1'} style={{color: '#6b7280', width:18, height: 18}}/>
                <p className='text-gray-500 ml-2'>{event.creator}</p>
              </Tooltip>
            </div>
          </div>
          <p className="font-medium pr-3">{event.description}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='md:text-end text-md font-medium my-3 md:my-0'>{event.datetime}</p>
        <div className="flex justify-between">
          <div className='flex items-center mr-6'>
            <Tooltip message={'Zainteresowani'} className={'flex'}>
              <FontAwesomeIcon icon={faHand} className={'w-5 h-5 mt-1'}/>
              <p className='text-lg ml-1'>{event.participating}</p>
            </Tooltip>
          </div>
          <Link to={`/event/${event.id}`}>
            <Button color='primary'>Zobacz</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
