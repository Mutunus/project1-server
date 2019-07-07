const NotesModel = require('./../../models/notes')
const mongoose = require('mongoose')

module.exports = {
    upsertNote: (req, res) => {
        const { note, _id, userId } = req.body
        NotesModel
        .findByIdAndUpdate(
            _id ? _id : new mongoose.Types.ObjectId(),
            {
                note,
                userId
            },
            {
                upsert: true
            }
        )
        .then(result => {
            console.log(result)
            res.status(201)
            .send()
        })
        .catch(error => {
            console.log(`unable to save note: ${error}`)
            res.status(500)
            .json({ error })
        })
    }
}