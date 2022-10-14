import React, { useState } from 'react'
import Autocomplete from "react-google-autocomplete"

export default function App() {
  const [address, setAddress] = useState('')

  console.log(address)

  return (
    <Autocomplete
        className={'input input-bordered w-full max-w-xs'}
        style={{margin: 20}}

      apiKey={'AIzaSyCmgoNY4M_yFr_gE703rDfc7RLkzfgHflA'}
      onPlaceSelected={(place) => {
        console.log(place)
        setAddress(place.formatted_address)
      }}
      options={{
        types: [], // address lub establishment(szkoly etc.)
        // fields: ["address_components", "geometry"],
        componentRestrictions: { country: "pl" },
      }}
    />
  )
}
