import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new note
export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote(noteData, token)
    } catch (error) {
        const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)        
    }
})

// Get user goals
// export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await goalService.getGoals(token)        
//     } catch (error) {
//         const message = 
//             (error.response && 
//                 error.response.data && 
//                 error.response.data.message) || 
//             error.message || 
//             error.toString()
//         return thunkAPI.rejectWithValue(message)         
//     }
// })

// Delete user goal
// export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await goalService.deleteGoal(id, token)
//     } catch (error) {
//         const message = 
//             (error.response && 
//                 error.response.data && 
//                 error.response.data.message) || 
//             error.message || 
//             error.toString()
//         return thunkAPI.rejectWithValue(message)        
//     }
// })

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: { 
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
               })
//             .addCase(getGoals.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(getGoals.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.goals = action.payload
//             })
//             .addCase(getGoals.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isError = true
//                 state.message = action.payload
//             })
//             .addCase(deleteGoal.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(deleteGoal.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.goals = state.goals.filter(
//                     (goal) => goal._id !== action.payload.id)
//             })
//             .addCase(deleteGoal.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isError = true
//                 state.message = action.payload
//             })
    },
  })

export const {reset} = noteSlice.actions
export default noteSlice.reducer
