import { useDispatch } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'

function NoteItem({ note }) {
  const dispatch = useDispatch()

  console.log(note)

  return (
    <div className='goal'>
      <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
      <h2>{note.title}</h2>
      <p>{note.description}</p>
      <button onClick={() => dispatch(deleteNote(note._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default NoteItem
