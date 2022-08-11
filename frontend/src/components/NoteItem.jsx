import {useDispatch} from 'react-redux'
// import {deleteGoal} from '../features/goals/goalSlice'

function NoteItem({note}) {

    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>
            {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
        <h2>{note.title}</h2>
        <h4>{note.description}</h4>
        {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
            X
        </button> */}
    </div>
  )
}

export default NoteItem