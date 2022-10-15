import React from 'react'

export default function LoginInput({ title, type, value, onChange }) {
  return (
    <label className='block'>
      <span className='block font-bold mb-2 ml-0.5'>{title}<sup className='text-red-700'>*</sup></span>
      <input type={type} value={value} onChange={onChange} className='border border-gray-300 focus:outline-none focus:border-primary rounded-md w-full p-2' />
    </label>
  )
}
