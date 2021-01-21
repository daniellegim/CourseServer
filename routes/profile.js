const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

const appInsights = require('applicationinsights')
let client = appInsights.defaultClient

async function getUser(req, res, next) {
    let user
    try {
        user = await Profile.findOne({pernum: req.params.id})
        if (user == null) {
            client.trackTrace({message: "User " + req.params.id + " not found"})
            // client.trackEvent({
            //     name: "User not found", 
            //     properties: {user: req.params.id}
            // })
            // client.trackException({
            //     exception: new Error("Can't find user")
            // })
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch(err) {
        client.trackException({
            exception: new Error("Can't search user")
        })
        res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

// Get user
router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

// Add new user
router.post('/', async (req, res) => {
    const user = new Profile({
        name: req.body.newUser.name,
        pernum: req.body.newUser.pernum,
        birthday: req.body.newUser.birthday,
        rank: req.body.newUser.rank,
        quote: req.body.newUser.quote
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router