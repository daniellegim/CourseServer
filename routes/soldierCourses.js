const express = require('express')
const router = express.Router()
const SoldierCourses = require('../models/soldierCourses')
const Courses = require('../models/courses')

// Get courses for soldier
router.get('/:id', async (req, res) => {
    try {
        const soldierCourses = await SoldierCourses.find({pernum: req.params.id})
        const courses = []

        for (const course of soldierCourses) {
            let soldiercourse = await Courses.findById(course.courseId)
            soldiercourse.dates = course.date
            courses.push(soldiercourse) 
        }

        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Add course for soldier
router.post('/', async (req, res) => {
    const course = new SoldierCourses({
        pernum: req.body.newCourse.pernum,
        courseId: req.body.newCourse.courseId,
        date: req.body.newCourse.date
    })
    try {
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router