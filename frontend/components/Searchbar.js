import { useState, useEffect, useRef } from "react"
import { Input, Button } from "react-daisyui"
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Searchbar = ({ allEvents, setEvents, ...args }) => {
  const [ value, setValue ] = useState('')
  const [ visible, setVisible ] = useState(true)
  const [ searches, setSearches ] = useState({
    'Tytuły': [],
    // 'Podsumowania': [],
    // 'Adresy': [],
    'Nazwy Użytkowników': [],
  })
  const ref = useRef()

  useEffect(() => {
    const handeClick = e => {
      if(!(ref.current && ref.current.contains(e.target))) {
        setVisible(true)
      }
    }
    const handleKeyPress = e => {
      if(e.key === 'Enter') {
        console.log('enter');
      }
    }

    document.addEventListener('click', handeClick)
    // document.addEventListener('keydown', handleKeyPress)
    
    return () => {
      document.removeEventListener('click', handeClick)
      // document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  useEffect(() => {
    if(allEvents?.length === 0) {
      return
    }
    setSearches({
      'Tytuły': allEvents.filter(search => search.title.toLowerCase().includes(value)),
      // 'Podsumowania': allEvents.filter(search => search.shortDescription.toLowerCase().includes(value)),
      // 'Adresy': allEvents.filter(search => search.address.toLowerCase().includes(value)),
      'Nazwy Użytkowników': allEvents.filter(search => search.creator.name.toLowerCase().includes(value)),
    })
    setVisible(!visible && value.length === 0)
  }, [value])

  const commitSearch = () => {
    const searchedEvents = [ ...new Set([].concat(...Object.values(searches))) ]

    setEvents(searchedEvents.length === 0 ? [ ...allEvents ] : searchedEvents)
  }

  return (
    <div className='relative'>
      <div className="relative">
        <Input 
          value={value} 
          onChange={e => setValue(e.target.value.toLowerCase())} 
          className='w-full focus:outline-none focus:border-primary text-lg' 
          {...args} 
        />
        <Button color='ghost' className="absolute inset-y-0 right-0" onClick={commitSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
        </Button>
      </div>
      <div ref={ref} className={`bg-base-100 p-3 absolute mt-0.5 w-full flex flex-col gap-y-6 gap-16 z-20 border border-base-200 rounded-lg drop-shadow-lg ${visible ? 'hidden' : ''}`}>
        {Object.entries(searches).map(search => (
          search[1].length > 0 && 
          <label key={search[0]}>
            <p className="font-bold text-base-content/50 text-sm">{search[0]}</p>
            <div className="flex flex-col">
              {search[1].slice(0, 5).map(s => (
              <Link key={s.id} href={`/events/${s.id}`}>
                <a className='flex justify-between py-1 px-2 hover:bg-base-content/10'>
                  <span>{s.title}</span>
                  {/* <span>{s.summary}</span> */}
                  {/* <span>{s.address}</span> */}
                  <span>{s.creator.name}</span>
                </a>
              </Link>))}
            </div>
          </label>))}
      </div>
    </div>
  )
}

export default Searchbar