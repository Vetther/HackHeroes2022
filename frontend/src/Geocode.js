import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export default function Geocode() {
    const [address, setAddress] = useState('')

    console.log(address)

    return (
    <GeoapifyContext apiKey="8d4075d6768247d9b9c64794d4ea8dc4">

        <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
                                      //type='street'
                                      lang='pl'
                                      countryCodes={"pl"}
                                      limit='5'
                                      placeSelect={onPlaceSelect}
                                      suggestionsFilter={filter}
        />
    </GeoapifyContext>
    )

    function onPlaceSelect(value) {
        console.log(value)
    }

    function filter(suggestions) {
        const returned = [];

        // suggestions.forEach(value => {
        //     if (value.properties.result_type === "street" || value.properties.result_type === "building" || value.properties.result_type === "city") {
        //         returned.push(value)
        //     }
        // })

        return suggestions;
    }
}
