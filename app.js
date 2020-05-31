const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/taskRoute')
require('dotenv').config()

const app = express()

// Middleware - Body Parser
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr'))

app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.status(200).json({message: 'API is working'})
})

const port = 3000

// VC9ODTlEc4bIota8
mongoose.connect(
    process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
    }).catch((err) => {
        console.log('Error connecting to DB'); 
    })

