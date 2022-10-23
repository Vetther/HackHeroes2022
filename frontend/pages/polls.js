import { useContext, useState, useEffect } from "react"
import { Button } from "react-daisyui"
import Router from 'next/router'

import AuthContext from "../contexts/auth"
import AlertContext from '../contexts/alert'

import Poll from "../components/Poll"
import PollModal from "../components/PollModal"

const Polls = ({ polls }) => {
  const { tokens } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)
  const [ modal, setModal ] = useState(false)
  const [ radio, setRadio ] = useState({ id: -1, selected: -1 })
  const [ edit, setEdit ] = useState({ edit: false, id: -1, choices: [], deleted: [], errors: [] })

  useEffect(() => {
    if(polls?.data.find(poll => poll.id === edit.id)?.choices.length < 5) {
      setEdit({ ...edit, choices: [''], deleted: [] })
    }
  }, [ edit.id ])
  
  useEffect(() => {
    if(edit.choices.at(-1) !== '' && polls.data.find(poll => poll.id === edit.id)?.choices.length + edit.choices.length < 5) {
      setEdit({ ...edit, choices: [ ...edit.choices, '' ], errors: [ ...edit.errors, '' ] })
    }
  }, [ edit.choices ])

  const vote = async () => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/poll/${radio.id}/choice/${radio.selected}/vote`, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    const data = await response.json()
    
    if(data.success) {
      Router.reload()
    }
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas głosowania na Ankietę' })
    }
  }
  
  const editPoll = async () => {
    const choicesRes = await Promise.all(edit.choices.filter(choice => choice !== '').map(choice => 
      fetch(`http://141.147.1.251:5000/api/v1/poll/${edit.id}/addchoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        },
        body: JSON.stringify({ name: choice })
      })
    ))
    const deletedRes = await Promise.all(edit.deleted.map(del =>
      fetch(`http://141.147.1.251:5000/api/v1/poll/${edit.id}/choice/${del}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        }
      })
    ))
    const choices = await Promise.all(choicesRes.map(res => res.json()))
    const deleted = await Promise.all(deletedRes.map(res => res.json()))

    if(choices.every(choice => choice.success) && deleted.every(del => del.success)) Router.reload()
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas edycji Ankiety' })
    }
  }

  const deletePoll = async id => {
    const response = await fetch(`http://141.147.1.251:5000/api/v1/poll/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      }
    })
    const data = await response.json()

    if(data.success) {
      Router.reload()
    }
    else {
      setAlert({ visible: true, type: 'error', message: 'Wystąpił błąd podczas usuwania Ankiety' })
    }
  }

  return (
    <>
      <div className="w-11/12 mx-auto pt-16">
        <Button color='primary' className='mb-6' onClick={() => setModal(true)}>Stwórz</Button>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
          {polls?.data.map(poll => ({ ...poll, publicationDate: new Date(poll.publicationDate) })).map(poll => (
            <Poll 
              key={poll.id}
              poll={poll} 
              radio={radio} 
              setRadio={setRadio} 
              vote={vote} 
              edit={edit} 
              setEdit={setEdit}
              editPoll={editPoll}
              deletePoll={deletePoll}
            />
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