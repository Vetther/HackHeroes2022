import React from 'react'

import Searchbar from './Searchbar'

export default function ModalInput({ title, required, type, value, onChange }) {
  const inputClass = 'border border-gray-300 focus:outline-none focus:border-primary rounded-md w-full p-2'

  return (
    <label className='block'>
      <span className='block font-bold mb-2 ml-0.5'>
        {title}
        {required && <sup className='text-red-700'>*</sup>}
      </span>
      {type === 'file' ?
        <input type="file" accept="image/png, image/jpeg" value={value} onChange={onChange} className='file:rounded-2xl file:border-0 file:bg-gray-300 hover:file:bg-primary hover:file:cursor-pointer file:text-white file:p-2' />
        : type === 'searchbar' ?
          <Searchbar setValue={onChange} />
        : type === 'textarea' ?
        <textarea rows='3' className={inputClass} value={value} onChange={onChange} />
      :
        <input type={type} className={inputClass} value={value} onChange={onChange} />
      }
    </label>
  )
}
