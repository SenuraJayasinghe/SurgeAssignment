const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const User = require('../models/userModel')


// @route GET /api/notes
const getNotes = asyncHandler( async (req, res) => {
    const notes = await Note.find({user:req.user.id})
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
        description: req.body.description,
        user: req.user.id
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
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
         //logged in user matches the note user
       if(note.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
       
 }
            const updatedNote = await Note.findByIdAndUpdate(req.params.id,
                 req.body,{new: true})

    res.json(updatedNote)
})

// @route DELETE /api/notes/: id
const deleteNotes = asyncHandler( async (req, res) =>{
    const note = await Note.findById(req.params.id)

    if (!note){
        res.status(400)
        throw new Error('note not found');
    }
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
         //logged in user matches the note user
     if(note.user.toString() !== user.id){
          res.status(401)
          throw new Error('User not authorized')
         
   }
     await note.deleteOne()
    res.status(200).json({id:req.params.id})
})


module.exports = {
    getNotes,
    setNotes,
    updateNotes,
    deleteNotes,
}