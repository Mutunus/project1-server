const NotesModel = require('./../../models/notes')
const mongoose = require('mongoose')

module.exports = {
    upsertNote: (req, res) => {
        const { note, _id } = req.body;
        const { userId } = req.user;

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
            res.status(201)
            .json('note successfully created')
        })
        .catch(error => {
            console.log(`unable to save note: ${error}`)
            res.status(500)
            .json({ error })
        })
    }
}