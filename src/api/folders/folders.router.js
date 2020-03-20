const express = require('express')
const FoldersService = require('./folders.service')

const foldersRouter = express.Router()

foldersRouter
    .route('/')
    .get(FoldersService.getAll)
    .post(FoldersService.post)

foldersRouter
    .route('/:id')
    .get(FoldersService.getById)
    .delete(FoldersService.deleteById)
    .put(FoldersService.putById)
    .patch(FoldersService.patchById)

module.exports = foldersRouter