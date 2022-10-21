import { useState, useEffect } from "react"
import { Input } from "react-daisyui"

const Searchbar = ({ searches, setSearches, ...args }) => {
  const [ value, setValue ] = useState('')
  const [ allSearches, setAllSearches ] = useState([])

  useEffect(() => {
    setAllSearches([ ...searches ])
  }, [])

  useEffect(() => {
    if(allSearches.length > 0) {
      setSearches(allSearches.filter(search => 
        search.title.toLowerCase().includes(value) ||
        search.shortDescription.includes(value) ||
        search.address.includes(value) ||
        search.creator.name.includes(value)
      ))
    }
  }, [value])

  return (
    <Input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
      className='w-full focus:outline-none focus:border-primary text-lg' 
      {...args} 
    />
  )
}

export default Searchbar