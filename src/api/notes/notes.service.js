const db = require('../../knexContext')
const xss = require('xss')

const notesTable = 'noteful_notes'
const serializeNotes = (note) => (
    {
        id: note.id, 
        name: xss(note.name), 
        date_modified: note.date_modified, 
        folder_id: note.folder_id,
        content: xss(note.content)
    }
)

const NotesService = {
    getAll(req, res, next) {
        return db
                .select('*')
                .from(notesTable)
                .then( notes => {
                    res.status(200).json(notes.map(note => serializeNotes(note)))
                })
                .catch( error => 
                    next({
                        message: 'error getting notes', 
                        status: error.status, 
                        loc: 'at notes.service.getAll', 
                        internalMessage: error.message
                    })
                )
    },

    post(req, res, next) {
        const { name, folder_id, content } = req.body
        const date = new Date()
        const note = {
            name: name, 
            date_modified: date, 
            folder_id: folder_id,
            content: content
        }
        
        for (const [key, value] of Object.entries(note)) {
            if(!value) {
                throw ( {message: `${value} is mandatory`, status: 400} )
            }
        }

        return db
                .insert(note)
                .into(notesTable)
                .returning('*')
                .then(notes => {
                    const note = notes[0]
                    res.status(201)
                       .location(`${req.originalUrl}/${note.id}`)
                       .json(serializeNotes(note))
                })
                .catch(error => {
                    next({
                        message: 'error creating note', 
                        status: error.status, 
                        loc: 'at notes.service.post', 
                        internalMessage: error.message
                    })
                })
    },

    getById(req, res, next) {
        const id = req.params.id
        if(!id) {
            throw( {message: 'id is mandatory', status: '400'} )
        }
        
        return db
                .select('*')
                .from(notesTable)
                .where('id', id)
                .first()
                .then( note => {
                    if(!note) {
                        throw ( {message: `Note doesn't exist`, status: 404} )
                    }
                    res.status(200).json(serializeNotes(note))
                })
                .catch( error => {
                    next( {
                        message: 'error getting note', 
                        status: error.status, 
                        loc: 'at notes.service.getById', 
                        internalMessage: error.message
                    } )
                }) 
    },

    putById(req, res, next) {
        const id = req.params.id
        const { name, date_modified, folder_id, content } = req.body
        const date = new Date(date_modified)
        const note = {
            name: name, 
            date_modified: date, 
            folder_id: folder_id,
            content: content
        }

        for (const [key, value] of Object.entries(note)) {
            if(!value) {
                throw ( {message: `${value} is mandatory`, status: 400} )
            }
        }
        
        return db
                .update(note)
                .from(notesTable)
                .where('id', id)
                .returning('*')
                .then( note => {
                    if(!note) {
                        throw ( {message: `Note doesn't exist`, status: 404} )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating note', 
                        status: error.status, 
                        loc: 'at notes.service.putById', 
                        internalMessage: error.message
                    })
                )        
    },

    patchById(req, res, next) {
        const id = req.params.id
        const { name, date_modified, folder_id, content } = req.body
        const note = {
            name: name, 
            folder_id: folder_id,
            content: content
        }
        if(date_modified) {
            const date = new Date(date_modified)
            note.date_modified = date
        }
        const date = new Date(date_modified)
        
        if(!id) {
            throw( {message: 'id is mandatory', status: '400'} )
        }
        if(!note.name && !note.date_modified && note.folder_id && !note.content) {
            throw( {message: 'request body must contain at least one value to update', status: '400'} )
        }
        
        return db
                .update(note)
                .from(notesTable)
                .where('id', id)
                .returning('*')
                .then( note => {
                    if(!note) {
                        throw ( {message: `Note doesn't exist`, status: 404} )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating note', 
                        status: error.status, 
                        loc: 'at notes.service.patchById', 
                        internalMessage: error.message
                    })
                )
    },

    deleteById(req, res, next) {
        const id = req.params.id
        if(!id) {
            throw( {message: 'id is mandatory', status: '400'} )
        }

        return db
                .del()
                .from(notesTable)
                .where('id', id)
                .then(result => {
                    if(!result) {
                        throw ( {message: `Note doesn't exist`, status: 404} )
                    }
                    res.status(200).json(`${result} note/s deleted`)
                })
                .catch( error => 
                    next({
                        message: 'error deleting note', 
                        status: error.status, 
                        loc: 'at notes.service.deleteById', 
                        internalMessage: error.message
                    })
                )
    }
}

module.exports = NotesService