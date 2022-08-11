import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import NoteForm from '../components/NoteForm'
// import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
// import { getGoals, reset } from '../features/goals/goalSlice'



function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth) //used to get the user
//   const {goals, isLoading, isError, message} = useSelector((state) => state.goals)



  useEffect(() => {

//     if(isError) {
//       console.log(message);
//     }

    if(!user) {
      navigate('/login')
    }

//     dispatch(getGoals())

//     return () => {
//       dispatch(reset())
//     }
  }, [user, navigate, dispatch])
  // isError,message

//   if(isLoading) {
//     return <Spinner />
//   }

  return <>
    <section className='heading'>
      {/* code below: if user (i.e. logged in), show name */}
      <h1>Welcome {user && user.firstName}</h1>
      <p>Notes Dashboard</p>
    </section>
    
    <NoteForm /> 

    {/* <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You have not set any goals</h3>)}
    </section> */}
  </>
}

export default Dashboard