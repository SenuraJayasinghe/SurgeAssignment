const asyncHandler = require('express-async-handler')
// @route GET /api/notes
const getNotes = asyncHandler( async (req, res) => {
    res.json({message:'Get notes'})
})

// @route POST /api/notes
const setNotes = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    res.json({message:'Set notes'})
})

// @route PUT /api/notes/:id
const updateNotes = asyncHandler (async (req, res) => {
    res.json({message:`Update note ${req.params.id}`})
})

// @route DELETE /api/notes/: id
const deleteNotes = asyncHandler(async (req, res) => {
    res.json({message:`Delete note ${req.params.id}`})
})

module.exports = {
    getNotes,
    setNotes,
    updateNotes,
    deleteNotes,
}