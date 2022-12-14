import { Tooltip, Button } from "react-daisyui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faUser, faTags } from "@fortawesome/free-solid-svg-icons"
import { faHand } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"

import Box from "./Box"
import Tag from "./Tag"
import errorImg from "../public/event3.svg"

const Event = ({ event }) => {
  return (
    <Box className='xl:flex justify-between'>
      <div className="sm:flex">
        <img src={event.imageUrl} className='rounded-lg object-cover shadow-md w-32 h-32' onError={(event) => {event.target.src=errorImg.src}} />
        <div className="flex flex-col justify-between sm:ml-6 mt-1 md:mt-0">
          <div>
            <p className='text-base-content text-xl font-semibold mb-2 break-all'>{event.title}</p>
            <Tooltip message='Lokalizacja' className='flex mb-2 tooltip-left'>
              <FontAwesomeIcon icon={faLocationDot} className={'info-content'} style={{color: '#6b7280', width:17, height: 17}}/>
              <p className='ml-2 text-sm text-base-content/70 text-left'>{event.address}</p>
            </Tooltip>
            <Tooltip message='Organizator' className='flex tooltip-left mb-2'>
              <FontAwesomeIcon icon={faUser} style={{color: '#6b7280', width:17, height: 17}}/>
              <Link href={`/profile/${event.creator.name}`}>
                <a className='text-base-content/70 ml-2 text-sm'>{event.creator.name}</a>
              </Link>
            </Tooltip>
            <Tooltip message='Tagi' className='flex items-center tooltip-left'>
              <FontAwesomeIcon icon={faTags} style={{color: '#6b7280', width:17, height: 17}}/>
              <div className="flex gap-x-1 ml-2 flex-wrap">
                {event.tags.map(tag => (
                  <Tag key={tag.id} tag={tag} small />
                ))}
              </div>
            </Tooltip>
          </div>
          <p className="font-medium pr-3 text-md font-normal base-content mt-2 break-word">{event.shortDescription}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <p className='xl:text-end font-medium my-3 xl:my-0'>{event.eventDate.toLocaleTimeString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}</p>
        <div className="flex justify-between">
          <div className='flex items-center mr-6'>
            <Tooltip message='Zainteresowani' className='flex'>
              <FontAwesomeIcon icon={faHand} className='w-5 h-5 mt-1 mr-1' />
              <p className='text-lg ml-1'>{event.interested?.length}</p>
            </Tooltip>
          </div>
          <Link href={`/events/${event.id}`}>
            <a>
              <Button color='primary' /* size={(windowWidth < 1100 && windowWidth > 1024) && 'sm'} */>Zobacz</Button>
            </a>
          </Link>
        </div>
      </div>
    </Box>
  )
}

export default Event