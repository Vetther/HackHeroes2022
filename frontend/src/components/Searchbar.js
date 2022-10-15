import React from 'react'
import Autocomplete from "react-google-autocomplete"

export default function Searchbar({ setValue }) {
  return (
    <Autocomplete
      apiKey={'AIzaSyCmgoNY4M_yFr_gE703rDfc7RLkzfgHflA'}
      onPlaceSelected={place => {
        // console.log(place)
        setValue(place.formatted_address)
      }}
      options={{
        types: ["address"],
        // fields: ["address_components", "geometry"],
        componentRestrictions: { country: "pl" },
      }}
      className='border border-gray-300 focus:outline-none focus:border-primary rounded-md w-full p-2'
    />
  )
}
