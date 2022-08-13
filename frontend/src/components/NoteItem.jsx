import {useDispatch} from 'react-redux'
import {useState} from 'react'
// import { useNavigate } from "react-router-dom";
import {deleteNote} from '../features/notes/noteSlice'
import {updateNote} from '../features/notes/noteSlice'

function NoteItem({note}) {

  const [updating, setUpdating] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)


    const dispatch = useDispatch()

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(updateNote({...note, title, description}))
      alert('Note Updated')
      setUpdating(false)
      setTitle('')
      setDescription('')
      console.log(title, description)
      }

    

  return (
    <div className="note">
        <div className='time'>
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
                required
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
                required
                value={description}
                placeholder="Update description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update Note</button>
            </div>
          </form>
        </section>
      ) : (
        <span onClick={() => setUpdating(!updating)}>
        <h3>{note.title}</h3>
        <h5 className = "desc">{note.description}</h5>
        <button onClick={() => dispatch(deleteNote(note._id))} className="close">
            X
        </button>
        </span>
      )}
     
    </div>
  ) 
}

export default NoteItem
