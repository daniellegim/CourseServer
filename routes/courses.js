const express = require('express')
const router = express.Router()
const Courses = require('../models/courses')

async function getCourse(req, res, next) {
    let course
    try {
        course = await Courses.findById(req.params.id)
        if (course == null) {
            return res.status(404).json({ message: 'Cannot find course' })
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

    res.course = course
    next()
}

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Courses.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create new course
router.post('/', async (req, res) => {
    const course = new Courses({
        name: req.body.newCourse.name,
        gmush: "50",
        description: req.body.newCourse.name,
        dates: req.body.newCourse.dates
    })
    try {
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update course(add date)
router.patch('/:id', getCourse, async (req, res) => {
    res.course.dates.push(req.body.newDate)
    try {
        const updatedCourse = await res.course.save()
        res.json(updatedCourse)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router