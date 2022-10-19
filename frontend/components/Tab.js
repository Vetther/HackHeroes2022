import Link from "next/link"
import { useRouter } from "next/router"
import {useContext} from "react";
import AuthContext from "../contexts/auth";

const Tab = ({ title, data }) => {
    const router = useRouter()

    const { user } = useContext(AuthContext)

    console.log(router.pathname)

  return (
    <div className='text-sm'>
      <p className='text-xs xl:pl-5 pl-4 uppercase text-gray-400'>{title}</p>
      <ul className="menu w-100 p-1 font-medium text-sm">
        {data.map(tab => (
          <li
            key={tab.name}
            className={`${tab.path !== router.pathname.replace("[user]", user?.sub) ? 'text-base-content/70' : 'border-r-4 border-primary text-base-content'} mb-1 pr-4`}
          >
              <Link href={tab.path} className='p-2'>
                  <a className='flex'>
                      <span className={`flex ${tab.path !== router.pathname.replace("[user]", user?.sub) ? 'text-gray-500' : 'text-primary'}`}>
                        {tab.icon}
                      </span>
                      <span>{tab.name}</span>
                  </a>
              </Link>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tab