import { useContext, useState } from "react"
import { Input, Button } from "react-daisyui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

import AuthContext from "../../contexts/auth"

import Searchbar from "../../components/Searchbar"
import Box from "../../components/Box"
import Event from "../../components/Event"
import EventModal from "../../components/EventModal"

const Events = ({ queryEvents }) => {
  const { user } = useContext(AuthContext)
  const [ visible, setVisible ] = useState(false)
  const [ events, setEvents ] = useState([
    ...queryEvents?.data.content
    .map(event => ({ ...event, eventDate: new Date(event.eventDate) }))
    .filter(event => event.eventDate > new Date())
    .sort((a, b) => a.eventDate - b.eventDate)
  ])
  const tags = [
  	{
  		id: 0,
  		name: "NAUKA",
  		hex: "e71849",
  	},
  	{
  		id: 1,
  		name: "ROZRYWKA",
  		hex: "5ced12",
  	},
  	{
  		id: 2,
  		name: "SPORT",
  		hex: "e51abe",
  	},
  ]

  return (
    <>
      <div className="flex flex-col gap-y-6 w-1/2 mx-auto sm:py-8 pb-8 pt-16">
        <div className="relative">
          <Searchbar searches={events} setSearches={setEvents} placeholder='Wyszukaj Wydarzenie...' />
          <Button color='ghost' className="absolute inset-y-0 right-0">
            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
          </Button>
        </div>
        {user && <Button color='primary' onClick={() => setVisible(true)} className='ml-auto'>Stwórz</Button>}
        <div className="xl:flex gap-x-2">
          {/* <Box xl='w-3/12 h-1/6 order-last mb-0' className='mb-10'>

          </Box> */}
          <div className="flex flex-col gap-y-4 w-full">
            {events.map(event => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      <EventModal open={visible} onClickBackdrop={() => setVisible(false)} />
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://141.147.1.251:5000/api/v1/events')
  const queryEvents = await res.json()

  return {
    props: { queryEvents }
  }
}

export default Events