import React from 'react'
import {Button, Tooltip} from 'react-daisyui'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHand} from "@fortawesome/free-regular-svg-icons";
import {faLocationDot, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Event({ id, address, creator, eventDate, img, interested, description, summary, tags, title }) {
  const datetime = new Date(eventDate)
  
  return (
    <div className="md:flex justify-between bg-base-100 rounded-lg p-4 drop-shadow">
      <div className='sm:flex'>
        <img src={img} alt={title} className='rounded-lg object-cover shadow-md' />
        <div className="flex flex-col justify-between sm:ml-6 mt-1 md:mt-0">
          <div>
            <p className='base-content text-xl font-semibold mb-2'>{title}</p>
            <div className='flex items-center mb-2'>
              <Tooltip message={'Lokalizacja'} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faLocationDot} className={'info-content'} style={{color: '#6b7280', width:17, height: 17}}/>
                <p className='ml-2 text-sm text-base-content/70'>{address}</p>
              </Tooltip>
            </div>
            <div className='flex items-center mb-4'>
              <Tooltip message={'Organizator'} position={"left"} className={'flex tooltip-left'}>
                <FontAwesomeIcon icon={faUser} className={''} style={{color: '#6b7280', width:17, height: 17}}/>
                <p className='text-base-content/70 ml-2 text-sm'>{creator}</p>
              </Tooltip>
            </div>
          </div>
          <p className="font-medium pr-3 text-md font-normal base-content">{summary}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='md:text-end text-md font-medium my-3 md:my-0'>{datetime.toLocaleString()}</p>
        <div className="flex justify-between">
          <div className='flex items-center mr-6'>
            <Tooltip message={'Zainteresowani'} className={'flex'}>
              <FontAwesomeIcon icon={faHand} className={'w-5 h-5 mt-1 mr-1'}/>
              <p className='text-lg ml-1'>{interested}</p>
            </Tooltip>
          </div>
          <Link to={`/event/${id}`}>
            <Button color='primary'>Zobacz</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
