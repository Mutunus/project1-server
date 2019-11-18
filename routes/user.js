const express = require('express')
const router = express.Router()
// CRUD functions are exported from external files to keep this route file tidy
const queries = require('../controllers/user/exports')

router.post('/register', queries.upsertUser)
router.post('/login', queries.login)
router.delete('/:userId', queries.deleteUser)

// export the router so it can be used as the 2nd argument for app.use in app.js
module.exports = router