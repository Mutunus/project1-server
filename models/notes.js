const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true },
    note: { type: String, required: true }
})

module.exports = mongoose.model('Notes', notesSchema)