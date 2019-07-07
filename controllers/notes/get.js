const NotesModel = require('./../../models/notes')
const mongoose = require('mongoose')

module.exports = {
    getUserNotes: (req, res) => {
        const { userId } = req.params
        NotesModel
        .find(
            {
                userId
            }
        )
        .then(result => {
            res.status(201)
            .json(result)
        })
        .catch(error => {
            console.log(`unable to save note: ${error}`)
            res.status(500)
            .json({ error })
        })
    }
}