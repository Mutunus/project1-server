const express = require('express')
const router = express.Router()
const queries = require('./../controllers/notes/exports')

router.post('/', queries.upsertNote)
router.get('/:userId', queries.getUserNotes)

module.exports = router