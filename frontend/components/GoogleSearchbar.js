import Autocomplete from "react-google-autocomplete"

export default function Searchbar({ onPlaceSelected, ...args }) {
  return (
    <Autocomplete
      apiKey={'AIzaSyCmgoNY4M_yFr_gE703rDfc7RLkzfgHflA'}
      onPlaceSelected={place => place.formatted_address 
        && onPlaceSelected(place.formatted_address)
      }
      options={{
        types: ["address"],
        // fields: ["address_components", "geometry"],
        componentRestrictions: { country: "pl" },
      }}
      {...args}
    />
  )
}
