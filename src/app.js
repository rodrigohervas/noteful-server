require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const accessHandler = require('./access-handler')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const foldersRouter =  require('./api/folders/folders.router')
const notesRouter =  require('./api/notes/notes.router')

const app = express()
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

//SECURITY HANDLE MIDDLEWARE
//app.use(accessHandler)

//HOME ENDPOINT
app.route('/')
    .get((req, res) => {
        res.status(200).json('Noteful server')
    })

// Folders ENDPOINT
app.use('/api/folders', foldersRouter)

// Notes ENDPOINT
app.use('/api/notes', notesRouter)


app.use(errorHandler)

module.exports = app