const Box = ({ sm, md, lg, xl, xxl, className, children }) => {
  const breakpoints = Object.entries({
    'sm': sm?.split(' '),
    'md': md?.split(' '),
    'lg': lg?.split(' '),
    'xl': xl?.split(' '),
    '2xl': xxl?.split(' ')
  }).filter(bp => bp[1])[0]

  return (
    <div className={`bg-base-100 border border-base-300 drop-shadow-lg rounded-lg p-4 ${breakpoints && breakpoints[1].map(bp => `${breakpoints[0]}:${bp}`).join(' ')} ${className || ''}`}>
      { children }
    </div>
  )
}

export default Box