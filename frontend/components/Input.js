import GoogleSearchbar from './GoogleSearchbar'

const Input = ({ type, error, onPlaceSelected, ...args }) => {
  const className = 'border-b border-b-base-content input focus:outline-none focus:border-primary w-full mb-1'

  return (
    <div>
      {type === 'address' ? 
        <GoogleSearchbar className={className} onPlaceSelected={onPlaceSelected} { ...args } />
      : type === 'textarea' ?
        <textarea className={className} { ...args } />
      :
        <input type={type} className={className} {...args} />
      }
      {!error?.valid && <p className='text-red-700'>{error?.message}</p>}
    </div>
  )
}

export default Input