import Box from "../../components/Box"

const UserEvent = ({ event }) => {
  // event?.data.title

  return (
    <div className="flex justify-center items-center h-screen">
      <Box md='flex' className='justify-between'>
        
      </Box>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query
  const res = await fetch(`http://141.147.1.251:5000/api/v1/event/${id}`)
  const event = await res.json()
  
  return {
    props: { event }
  }
}

export default UserEvent