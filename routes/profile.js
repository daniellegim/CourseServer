const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

async function getUser(req, res, next) {
    let user
    try {
        user = await Profile.findOne({persnumber: req.params.id})
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

// Get user
router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

module.exports = router