const Task = require('../models/taskSchema')

const createTask = async (req, res) => {

    const newTask = new Task({
        title: req.body.title,
        assignee: req.body.assignee
    })

    try {
        const savedTask = await newTask.save();
        const result = {
            action: 'CREATED',
            data: savedTask
        }
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json(err)
    }

}

const getTask = async (req, res) => {

    try {
        const task = await Task.find({_id: req.params.id})
        const result = {
            action: 'READ',
            data: task
        }
        res.status(200).json(result)
    } catch (err) {
        err.reason = 'Task cannot be found!'
        res.status(500).json(err)
    }

}

const updateTask = async (req, res) => {

    try {
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {
                title: req.body.title,
                assignee: req.body.assignee,
                completed: req.body.completed
            } },
            {new: true}
        );

        const result = {
            action: 'UPDATED',
            data: updateTask
        }
    
        res.status(200).json(result)
        
    } catch (err) {
        
        res.status(500).json({ message: err })
    }


}

const deleteTask = async (req, res) => {

    try {
        const deletedTask = await Task.findOneAndDelete({_id: req.params.id});

        const result = {
            action: 'DELETED',
            data: deletedTask
        }
        res.status(200).json(result)

    } catch (err) {
        
    }


}

module.exports = { createTask, getTask, updateTask, deleteTask }