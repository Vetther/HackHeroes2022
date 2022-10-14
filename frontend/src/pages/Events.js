import React, { useState } from 'react'
import { Button } from 'react-daisyui'

import Searchbar from '../components/Searchbar'
import Event from '../components/Event'

import bb from '../bb.jpg'

export default function Events() {
  const [address, setAddress] = useState('')

  return (
    <>
      <div className="flex flex-col w-5/6 mx-auto mt-8 gap-y-4">
        <Searchbar setAddress={setAddress} />
        <div className="flex justify-end">
          <Button color='primary'>Stwórz</Button>
        </div>
        <div className="xl:flex gap-x-2">
          <div className='xl:w-3/12 mb-4 xl:mb-0 bg-slate-300 rounded-lg p-4 drop-shadow-lg xl:order-last'>
            
          </div>
          <div className='xl:w-9/12'>
            <Event 
              img={bb} 
              title={'Urodziny Macieja'}
              address={'Katowicka 10, Bielsko-Biala'}
              description={'Zapraszam wszystkich swietowac urodziny Macka!'}
              datetime={'20/10/2022 21:30'} 
              participating={54}
            />
          </div>
        </div>
      </div>
    </>
  )
}
