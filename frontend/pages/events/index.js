import { useContext, useState, useEffect } from "react"
import { Button } from "react-daisyui"

import AuthContext from "../../contexts/auth"

import Searchbar from "../../components/Searchbar"
import Box from "../../components/Box"
import Event from "../../components/Event"
import EventModal from "../../components/EventModal"
import Tag from "../../components/Tag"
import Router from "next/router";

const Events = ({ queryEvents, queryTags }) => {
  const { user } = useContext(AuthContext)
  const [ visible, setVisible ] = useState(false)
  const [ allEvents, setAllEvents ] = useState([])
  const [ events, setEvents ] = useState([
    ...queryEvents?.data.content
    .map(event => ({ ...event, eventDate: new Date(event.eventDate) }))
    .filter(event => event.eventDate > new Date())
    .sort((a, b) => a.eventDate - b.eventDate)
  ])
  const [ selectedTags, setSelectedTags ] = useState([])

  useEffect(() => {
    setAllEvents(queryEvents?.data.content
      .map(event => ({ ...event, eventDate: new Date(event.eventDate) }))
      .filter(event => event.eventDate > new Date())
      .sort((a, b) => a.eventDate - b.eventDate))
  }, [])

  const getFilteredEvents = () => {
    if(selectedTags.length === 0) {
      return events
    }

    return events.filter(event => selectedTags.every(tag => [...event.tags.map(tag => tag.id)].includes(tag)))
  }

  return (
    <>
      <div className="flex flex-col gap-y-6 w-7/12 mx-auto sm:py-8 pb-8 pt-16">
        <Searchbar allEvents={allEvents} placeholder='Wyszukaj Wydarzenie...' setEvents={setEvents} />
        <Button color='primary' onClick={() => {
          (user)
            ? setVisible(true)
            : Router.push("/login")
        }} className='ml-auto'>Stwórz</Button>
        <div className="2xl:flex gap-x-2">
          <Box className='2xl:w-3/12 2xl:h-1/6 2xl:order-last 2xl:mb-0 mb-10'>
            <p className='text-sm text-gray-400'>TAGI</p>
            <div className="flex 2xl:flex-col gap-2 mt-2 flex-wrap">
              {queryTags?.data
                .sort((a, b) => 
                  a.name.toLowerCase() < b.name.toLowerCase() 
                  ? -1 
                  : a.name.toLowerCase() > b.name.toLowerCase() 
                  ? 1 
                  : 0)
                .map(tag => (
                <Tag 
                  key={tag.id} 
                  tag={tag}
                  onClick={() => 
                    !selectedTags.includes(tag.id) 
                    ? setSelectedTags([ ...selectedTags, tag.id ])
                    : setSelectedTags([ ...selectedTags.filter(sTag => sTag !== tag.id) ])
                  } 
                  selected={selectedTags.includes(tag.id)}
                />
              ))}
            </div>
          </Box>
          <div className="flex flex-col gap-y-4 w-full">
            {getFilteredEvents().map(event => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      <EventModal open={visible} onClickBackdrop={() => setVisible(false)} tags={queryTags?.data} />
    </>
  )
}

export const getServerSideProps = async () => {
  const [ eventsRes, tagsRes ] = await Promise.all([
    fetch('http://141.147.1.251:5000/api/v1/events'),
    fetch('http://141.147.1.251:5000/api/v1/tags'),
  ])
  const [ queryEvents, queryTags ] = await Promise.all([
    eventsRes.json(),
    tagsRes.json(),
  ])

  return {
    props: { queryEvents, queryTags }
  }
}

export default Events