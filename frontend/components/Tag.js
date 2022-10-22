import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiamond } from "@fortawesome/free-solid-svg-icons"

const Tag = ({ tag, selected, small, ...args }) => {
  return (
    <label 
      className={`flex items-center gap-x-2 border rounded-full py-1 px-2 ${small ? 'text-xs' : 'text-sm'} ${selected && 'bg-base-100'} hover:cursor-pointer transition ease-in-out duration-300`}
      style={{ backgroundColor: selected ? `#${tag.hex}95` : 'transparent' }}
      { ...args }
    >
      <FontAwesomeIcon 
        icon={faDiamond} 
        className='brightness-75 text-red-700' 
        style={{ color: tag.hex }} 
      />
      <span>{tag.name}</span>
    </label>
  )
}

export default Tag