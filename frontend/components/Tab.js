import Link from "next/link"
import { useRouter } from "next/router"

const Tab = ({ title, data }) => {
  const router = useRouter()

  return (
    <div className='text-sm'>
      <p className='uppercase text-gray-400 mb-1'>{title}</p>
      <ul className="menu font-medium">
        {data.map(tab => (
          <li
            key={tab.name}
            className={tab.path !== router.pathname ? 'text-base-content/70' : 'border-r-4 border-primary text-base-content'}
          >
            <Link href={tab.path}>
              <div className='flex'>
                <span className={tab.path !== router.pathname ? 'text-gray-500' : 'text-primary'}>
                  {tab.icon}
                </span>
                <p>{tab.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tab