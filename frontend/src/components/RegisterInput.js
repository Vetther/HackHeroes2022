import React from 'react'

export default function RegisterInput({ type, placeholder, value, setValue, onBlur, ...args }) {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value} 
      onChange={setValue} 
      onBlur={onBlur}
      className='border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2'
      {...args}
    />
  )
}
