const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gmush: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dates: [{
        type: Date
    }]
})

module.exports = mongoose.model('Courses', coursesSchema)