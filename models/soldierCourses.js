const mongoose = require('mongoose')

const soldierCoursesSchema = new mongoose.Schema({
    pernum: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {collection: "soldierCourses"})

module.exports = mongoose.model('SoldierCourses', soldierCoursesSchema)