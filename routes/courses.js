const express = require('express')
const router = express.Router()
const Courses = require('../models/courses')

// Get all courses
router.get('/', async (req, res) => {
    //res.send('Hello')
    try {
        const courses = await Courses.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create new course
router.post('/', (req, res) => {

})

// Update course(add date)
router.patch('/:id', (req, res) => {

})

module.exports = router