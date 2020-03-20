const express = require('express')
const NotesService = require('./notes.service')

const notesRouter = express.Router()

notesRouter
    .route('/')
    .get(NotesService.getAll)
    .post(NotesService.post)

notesRouter
    .route('/:id')
    .get(NotesService.getById)
    .delete(NotesService.deleteById)
    .put(NotesService.putById)
    .patch(NotesService.patchById)

module.exports = notesRouter