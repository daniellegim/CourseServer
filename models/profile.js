const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pernum: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    }
}, {collection: "Users"})

module.exports = mongoose.model('Profile', profileSchema)