const express = require('express')
const router = express.Router()
const {getNotes, setNotes, updateNotes, deleteNotes} = require('../controllers/noteController')

router.route('/').get(getNotes).post(setNotes)
router.route('/:id').put(updateNotes).delete(deleteNotes)




module.exports = router