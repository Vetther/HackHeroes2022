const Box = ({ className, children, ...args }) => {

  return (
    <div className={`bg-base-100 border border-base-300 drop-shadow-lg rounded-lg p-4 ${className || ''}`} { ...args }>
      { children }
    </div>
  )
}

export default Box