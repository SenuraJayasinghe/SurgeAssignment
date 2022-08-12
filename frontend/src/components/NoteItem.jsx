import {useDispatch} from 'react-redux'
import {useState} from 'react'
// import { useNavigate } from "react-router-dom";
import {deleteNote} from '../features/notes/noteSlice'
import {updateNote} from '../features/notes/noteSlice'

function NoteItem({note}) {

  const [updating, setUpdating] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


    const dispatch = useDispatch()

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(updateNote({...note, title, description}))
      setUpdating(false)
      setTitle('')
      setDescription('')
      console.log(title, description)
      }

    

  return (
    <div className="goal">
        <div>
            {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
        {updating ? (
        <section className="form">
          <form onSubmit={onSubmit}>
          <button onClick={() => setUpdating(false)} className="close">
            X
        </button>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Update Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="Update description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update Goal</button>
            </div>
          </form>
        </section>
      ) : (
        <span onClick={() => setUpdating(!updating)}>
        <h2>{note.title}</h2>
        <h4>{note.description}</h4>
        <button onClick={() => dispatch(deleteNote(note._id))} className="close">
            X
        </button>
        </span>
      )}
    </div>
  ) 
}

export default NoteItem

{/* <button onClick={toUpdateNote} className="update">
           Update
        </button> */}

    //     let navigate = useNavigate(); 
    // const toUpdateNote = () =>{ 
    //   let path = '\register'; 
    //   navigate(path);
    // }

