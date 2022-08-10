const express =  require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getUsers, updateUser, deleteUser } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.get('/all', getUsers)
router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/me',protect, getMe) 



module.exports = router 