import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createNote} from '../features/notes/noteSlice'


function NoteForm() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createNote({title, description}))
        setTitle('')
        setDescription('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        required
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        required
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Note
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NoteForm