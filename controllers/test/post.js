const TestModel = require('./../../models/test')
const mongoose = require('mongoose')

module.exports = {
    upsertTest: (req, res) => {
        console.log(req.body)
        // create a instance of product using our mongoose Product model
        const test = new TestModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        })
        test
        .save()
        .then(result => {
            console.log(result)
            res.status(201)
            // create an instance of a vanilla js class as the return value
            .json('good job')
        })
        .catch(error => {
            console.log(`unable to save product: ${error}`)
            res.status(500)
            .json({ error })
        })
    }
}