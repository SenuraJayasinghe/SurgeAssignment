import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { FaUser } from 'react-icons/fa'
import NoteForm from '../components/NoteForm'
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'
import { getNotes } from '../features/notes/noteSlice'
import { reset } from '../features/auth/authSlice'



function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth) //used to get the user
  const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

// console.log(notes)

  useEffect(() => {

    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getNotes())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message,  dispatch])
    

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className='heading'>
      <h1>Welcome {user && user.firstName}</h1>
      <p>Notes Dashboard</p>
    </section>
    
    <NoteForm /> 

    <section className="content">
      {notes.length > 0 ? (
        <div className="notes">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      ) : (<h3>You have not set any notes</h3>)}
    </section>
  </>
}

export default Dashboard
