import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {deleteNote} from '../features/notes/noteSlice'

function NoteItem({note}) {

    const dispatch = useDispatch()

    let navigate = useNavigate(); 
    const toUpdateNote = () =>{ 
      let path = `/register`; 
      navigate(path);
    }

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
        <button onClick={toUpdateNote} className="update">
           Update
        </button>
       
    </div>
  ) 
}

export default NoteItem

