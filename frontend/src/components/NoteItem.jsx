import {useDispatch} from 'react-redux'
import {deleteNote} from '../features/notes/noteSlice'

function NoteItem({note}) {

    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>
            {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
        <h2>{note.title}</h2>
        <h4>{note.description}</h4>
        <button onClick={() => dispatch(deleteNote(note._id))} className="close">
            X
        </button>
    </div>
  )
}

export default NoteItem