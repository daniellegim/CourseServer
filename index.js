const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
                                             useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const coursesRouter = require('./routes/courses')
const profileRouter = require('./routes/profile')

app.use('/courses', coursesRouter)
app.use('/profile', profileRouter)

app.listen(5000, () => console.log('Server started'))
