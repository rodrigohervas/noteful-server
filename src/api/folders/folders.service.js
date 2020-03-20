const db = require('../../knexContext')
const xss = require('xss')

const foldersTable = 'noteful_folders'
const serializeFolder = (folder) => (
    {
        id: folder.id, 
        name: xss(folder.name)
    }
)

const FoldersService = {
    getAll(req, res, next) {
        return db
                .select('*')
                .from(foldersTable)
                .then( folders => {
                    res.status(200).json(folders.map(folder => serializeFolder(folder)))
                })
                .catch( error => 
                    next({
                        message: 'error getting folders', 
                        status: error.status, 
                        loc: 'at folders.service.getAll', 
                        internalMessage: error.message
                    })
                )
    },

    post(req, res, next) {
        const folderName = req.body.name
        const folder = {
            name: folderName
        }

        if(!folderName) {
            throw( {message: 'folder name is mandatory', status: '400'} )
        }

        return db
                .insert(folder)
                .into(foldersTable)
                .returning('*')
                .then(folders => {
                    const folder = folders[0]
                    res.status(201)
                       .location(`${req.originalUrl}/${folder.id}`)
                       .json(serializeFolder(folder))
                })
                .catch(error => {
                    next({
                        message: 'error creating folder', 
                        status: error.status, 
                        loc: 'at folders.service.post', 
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
                .from(foldersTable)
                .where('id', id)
                .first()
                .then( folder => {
                    if(!folder) {
                        throw ( {message: `Folder doesn't exist`, status: 404} )
                    }
                    res.status(200).json(serializeFolder(folder))
                })
                .catch( error => {
                    next( {
                        message: 'error getting folder', 
                        status: error.status, 
                        loc: 'at folders.service.getById', 
                        internalMessage: error.message
                    } )
                }) 
    },

    putById(req, res, next) {
        const id = req.params.id
        const folderName = req.body.name
        const folder = {
            name: folderName
        }

        if(!id) {
            throw( {message: 'id is mandatory', status: '400'} )
        }
        if(!folderName) {
            throw( {message: 'folder name is mandatory', status: '400'} )
        }
        
        return db
                .update(folder)
                .from(foldersTable)
                .where('id', id)
                .returning('*')
                .then( folder => {
                    if(!folder) {
                        throw ( {message: `Folder doesn't exist`, status: 404} )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating folder', 
                        status: error.status, 
                        loc: 'at folders.service.putById', 
                        internalMessage: error.message
                    })
                )        
    },

    patchById(req, res, next) {
        const id = req.params.id
        const folderName = req.body.name
        const folder = {
            name: folderName
        }

        if(!id) {
            throw( {message: 'id is mandatory', status: '400'} )
        }
        if(!folderName) {
            throw( {message: 'folder name is mandatory', status: '400'} )
        }
        
        return db
                .update(folder)
                .from(foldersTable)
                .where('id', id)
                .returning('*')
                .then( folder => {
                    if(!folder) {
                        throw ( {message: `Folder doesn't exist`, status: 404} )
                    }
                    res.status(204).end()
                })
                .catch( error => 
                    next({
                        message: 'error updating folder', 
                        status: error.status, 
                        loc: 'at folders.service.patchById', 
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
                .from(foldersTable)
                .where('id', id)
                .then(result => {
                    if(!result) {
                        throw ( {message: `Folder doesn't exist`, status: 404} )
                    }
                    res.status(200).json(`${result} folder/s deleted`)
                })
                .catch( error => 
                    next({
                        message: 'error deleting folder', 
                        status: error.status, 
                        loc: 'at folders.service.deleteById', 
                        internalMessage: error.message
                    })
                )
    }
}

module.exports = FoldersService