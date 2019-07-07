const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// routes
const testRoutes = require('./routes/test')
const notesRoutes = require('./routes/notes')

mongoose.connect(`mongodb://localhost/shitdicks`)

mongoose.connection.on('connected', () => console.log('mongoose connected'))

// to allow CORS requests and stop the browser complaining then you need to set the response headers to allow CORS
app.use((req, res, next) => {
    // * means that all CORS requests are allowed from any url. this could instead be a string of allowed domains.
    res.header('Access-Control-Allow-Origin', '*')
    // * means that all headers are allowed. this could instead be a string allowed headers.
    res.header('Access-Control-Allow-Headers', '*')
    // the browser will always send an options request first when performing a PUT or POST request
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        // if the browser is testing if it can make the request then just respond with a 200 status with the above header attached
        return res.status(200).json(null)
    }
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/test', testRoutes)
app.use('/api/notes', notesRoutes)

app.listen(3000, () => console.log('server1 listening on port 3000'))