const express = require('express')
const taskController = require('../controllers/taskController')

// Router init
const router = express.Router()

// Create
router.post('/create', taskController.createTask)
// Read
router.get('/get/:id', taskController.getTask)
// Update
router.patch('/update/:id', taskController.updateTask)
// Delete
router.delete('/delete/:id', taskController.deleteTask)


module.exports = router