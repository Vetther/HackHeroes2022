const Input = ({ title, required, error, ...args }) => {
  return (
    <div>
      {title && <p>{title}{required && <sup className='text-red-700'>*</sup>}</p>}
      <input className='border-b border-base-100 bg-base-100 border-b-base-content focus:outline-none focus:border-primary w-full pb-2' {...args} />
      {!error?.valid && <p className='text-red-700'>{error?.message}</p>}
    </div>
  )
}

export default Input