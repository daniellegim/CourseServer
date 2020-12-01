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

module.exports = router