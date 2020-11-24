const express = require('express')
const router = express.Router()

// Get all courses
router.get('/', (req, res) => {
    res.send('Hello world')
})

// Create new course
router.post('/', (req, res) => {

})

// Update course(add date)
router.patch('/:id', (req, res) => {

})

module.exports = router