import { useState, useEffect, useRef } from "react"
import { Input } from "react-daisyui"
import Link from 'next/link'

const Searchbar = ({ allEvents, ...args }) => {
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
    window.onclick = e => {
      if(!(ref.current && ref.current.contains(e.target))) {
        setVisible(true)
      }
    }
    window.onkeydown = e => {
      if(e.key === 'Enter') {
        console.log('enter');
      }
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

  return (
    <>
      <Input 
        ref={ref}
        value={value} 
        onChange={e => setValue(e.target.value.toLowerCase())} 
        className='w-full focus:outline-none focus:border-primary text-lg' 
        {...args} 
      />
      <div ref={ref} className={`bg-base-100 p-3 mt-0.5 absolute w-full flex flex-col gap-y-6 gap-16 z-20 border border-base-200 rounded-lg drop-shadow-lg ${visible ? 'hidden' : ''}`}>
        {Object.entries(searches).map(search => (
          search[1].length > 0 && 
          <label key={search[0]}>
            <p className="font-bold text-base-content/50 text-sm">{search[0]}</p>
            <div className="flex flex-col">
              {search[1].slice(0, search[1].length > 5 ? 5 : search[1].length).map(s => (
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
    </>
  )
}

export default Searchbar