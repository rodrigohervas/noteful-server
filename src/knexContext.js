const knex = require('knex')
const config = require('./config')

const db = knex({
    client: 'pg', 
    connection: (config.NODE_ENV === 'test') ? config.TEST_DB_URL : config.DB_URL
})

module.exports = db