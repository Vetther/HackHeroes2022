import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export default function Geocode() {
    const [address, setAddress] = useState('')

    console.log(address)

    return (
    <GeoapifyContext apiKey="8d4075d6768247d9b9c64794d4ea8dc4">

        <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
                                      lang={'pl'}
                                      filterByCountryCode={['pl']}
                                      limit={10}
                                      placeSelect={onPlaceSelect}
                                      suggestionsFilter={filter}
                                      skipIcons={true}
        />
    </GeoapifyContext>
    )

    function onPlaceSelect(value) {
        console.log(value)
    }

    function filter(suggestions) {
        const returned = [];

        console.log(suggestions)

        // suggestions.forEach(value => {
        //     if (value.properties.result_type === "street" || value.properties.result_type === "building" || value.properties.result_type === "city") {
        //         returned.push(value)
        //     }
        // })

        return suggestions;
    }
}
