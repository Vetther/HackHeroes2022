import { useState } from "react"
import { Radio, Button } from "react-daisyui"

import Box from "../components/Box"
import PollModal from "../components/PollModal"

const Polls = ({ polls }) => {
  const [ modal, setModal ] = useState(false)
  const [ radio, setRadio ] = useState({ id: -1, selected: -1 })

  const vote = () => {

  }

  return (
    <>
      <div className="w-11/12 mx-auto pt-16">
        <Button color='primary' className='mb-6' onClick={() => setModal(true)}>Stwórz</Button>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
          {polls?.data.map(poll => ({ ...poll, publicationDate: new Date(poll.publicationDate) })).map(poll => (
            <Box key={poll.id}>
              <h1 className='font-bold text-xl uppercase mb-0.5'>{poll.title}</h1>
              <p className='text-base-content/70 text-sm mb-2'>{poll.creator.name} &#8226; {poll.publicationDate.toLocaleTimeString([], {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className='text-sm mb-4'>{poll.description}</p>
              <div className="flex flex-col gap-y-3 mb-4">
                {poll.choices.map(choice => (
                  <div key={choice.id} className="flex items-center hover:cursor-pointer hover:text-base-content/70 w-fit" onClick={() => setRadio({ id: poll.id, selected: choice.id })}>
                    <Radio name={poll.id} checked={radio.id === poll.id && radio.selected === choice.id} readOnly />
                    <p className='ml-2'>{choice.name}</p>
                  </div>
                ))}
              </div>
              <Button size='sm' color='primary' disabled={radio.id !== poll.id} onClick={vote}>Zagłosuj</Button>
            </Box>
          ))}
        </div>
      </div>
      <PollModal open={modal} onClickBackdrop={() => setModal(false)} />
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://141.147.1.251:5000/api/v1/polls')
  const polls = await res.json()

  return {
    props: { polls }
  }
}

export default Polls