import React from 'react'
import {Button, Tooltip} from 'react-daisyui'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHand} from "@fortawesome/free-regular-svg-icons";
import {faLocationDot, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Event({ event }) {
  return (
    <div className="md:flex justify-between bg-base-100 rounded-lg p-4 drop-shadow">
      <div className='sm:flex'>
        <img src={event.img} alt={event.title} className='rounded-lg object-cover shadow-xl' />
        <div className="flex flex-col justify-between sm:ml-6 mt-1 md:mt-0">
          <div>
            <p className='base-content text-xl font-semibold mb-2'>{event.title}</p>
            <div className='flex items-center mb-2'>
              <Tooltip message={'Lokalizacja'} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faLocationDot} className={'info-content'} style={{color: '#6b7280', width:17, height: 17}}/>
                <p className='ml-2 text-sm info-content'>{event.address}</p>
              </Tooltip>
            </div>
            <div className='flex items-center mb-4'>
              <Tooltip message={'Organizator'} position={"left"} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faUser} className={''} style={{color: '#6b7280', width:17, height: 17}}/>
                <p className='info-content ml-2 text-sm'>{event.creator}</p>
              </Tooltip>
            </div>
          </div>
          <p className="font-medium pr-3 text-md font-normal base-content">{event.description}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='md:text-end text-md font-medium my-3 md:my-0'>{event.datetime}</p>
        <div className="flex justify-between">
          <div className='flex items-center mr-6'>
            <Tooltip message={'Zainteresowani'} className={'flex'}>
              <FontAwesomeIcon icon={faHand} className={'w-5 h-5 mt-1 mr-1'}/>
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
