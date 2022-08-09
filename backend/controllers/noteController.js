const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')


// @route GET /api/notes
const getNotes = asyncHandler( async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
})

// @route POST /api/notes
const setNotes = asyncHandler(async (req, res) => {
    if(!req.body.title) {
        res.status(400)
        throw new Error('please add a title')

    } else if(!req.body.description){
        res.status(400)
        throw new Error('please add a description')
    }
    const note = await Note.create({
        title: req.body.title,
        description: req.body.description
    })
    res.json(note)
})

// @route PUT /api/notes/:id
const updateNotes = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id)
        if(!note) {
            res.status(400)
            throw new Error('Note not found')
        }
            const updatedNote = await Note.findByIdAndUpdate(req.params.id,
                 req.body,{new: true})

    res.json(updatedNote)
})

// @route DELETE /api/notes/: id
const deleteNotes = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if(!note) {
        res.status(400)
        throw new Error('Note not found')
    
    }  await note.remove()

    res.json({id: req.params.id} )
})

module.exports = {
    getNotes,
    setNotes,
    updateNotes,
    deleteNotes,
}