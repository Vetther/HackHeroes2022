import { useContext } from "react"
import { Button, Table } from "react-daisyui"
// import Link from "next/link"

import AuthContext from "../../../contexts/auth"

import Box from "../../../components/Box"

const Events = ({ events }) => {
  const { user } = useContext(AuthContext)

  return (
    <div className='flex justify-center'>
      <Box className='w-2/3 sm:mt-8 mt-16'>
        <div className="sm:flex justify-between items-center mb-6">
          <p className="text-primary text-2xl font-bold sm:mb-0 mb-4">Twoje Wydarzenia</p>
          <Button color='primary' size='sm' onClick={() => setModal(true)}>Stwórz</Button>
        </div>
        <Table className='w-full' zebra>
          <Table.Head>
            <span>Tytuł</span>
            <span>Data Utworzenia</span>
            <span>Data Wydarzenia</span>
          </Table.Head>
          <Table.Body>
            {events?.data.content.filter(event => event.creator.id === user?.id).map(event => (
              <Table.Row hover key={event.id}>
                <span>{event.title}</span>
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
  const res = await fetch('http://141.147.1.251:5000/api/v1/events')
  const events = await res.json()

  return {
    props: { events }
  }
}

export default Events