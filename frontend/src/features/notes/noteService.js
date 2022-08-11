import axios from 'axios'

const API_URL = '/api/notes/'

// Create new note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, noteData, config)
console.log(response.data)
  return response.data
}

// Get user goals
// const getGoals = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL, config)

//   return response.data
// }

// Delete user goal
// const deleteGoal = async (goalId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//      },
//  }

//   const response = await axios.delete(API_URL + goalId, config)

//   return response.data
// }

const goalService = {
  createNote,
//   getGoals,
//   deleteGoal,
}

export default goalService
