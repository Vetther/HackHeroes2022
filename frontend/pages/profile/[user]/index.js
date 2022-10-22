import { useContext } from 'react'
import { Table } from 'react-daisyui'
import Link from 'next/link'

import AuthContext from '../../../contexts/auth'

import Box from '../../../components/Box'

const User = ({ events }) => {
  const { user } = useContext(AuthContext)
  console.log(events);

  return (
    <div className="w-2/3 mx-auto pt-8">
      <Box className='uppercase text-center text-5xl font-bold mb-16'>
        { user?.sub }
      </Box>
      <Box>
        <Link href={`/profile/${user?.sub}/events`}>
          <a className='text-primary font-bold text-xl hover:text-violet-500/60'>Wydarzenia Użytkownika {user?.sub}</a>
        </Link>
        <Table className='w-full mt-2' zebra>
          <Table.Head>
            <span>Tytuł</span>
            <span>Data Utworzenia</span>
            <span>Data Wydarzenia</span>
          </Table.Head>
          <Table.Body>
            {events?.data?.content.filter(event => event.creator.id === user?.id)
              .map(event => ({ ...event, eventDate: new Date(event.eventDate) }))
              .filter(event => event.eventDate > new Date())
              .sort((a, b) => a.eventDate - b.eventDate)
              .splice(0, 3)?.map(event => (
                <Table.Row hover key={event.id}>
                  <span>{event.title.length > 12 ? `${event.title.substring(0, 12)}...` : event.title}</span>
                  <span>{new Date(event.publicationDate).toLocaleString()}</span>
                  <span>{new Date(event.eventDate).toLocaleString()}</span>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Box>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://141.147.1.251:5000/api/v1/events')
  const events = await response.json()

  return {
    props: { events }
  }
}

export default User