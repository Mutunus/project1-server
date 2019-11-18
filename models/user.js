const mongoose = require('mongoose')

// the mongoose schema is the data structure for the model
const userSchema = mongoose.Schema({
    // ObjectId is uuid type
    _id: mongoose.Schema.Types.ObjectId,
    // if a required prop is not provided when instantiating the model an error is thrown 
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// export the mongoose model. the 1st argument is the model name (uppercase is convention) and the 2nd argument
// is the schema for the model
module.exports = mongoose.model('User', userSchema)