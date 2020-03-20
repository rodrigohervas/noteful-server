# Noteful server!

Nodejs server with CRUD functionality.

All actions are executed against a PostgreSQL local DB.

Packages used: express, node-fetch, morgan, cors, dotenv, helmet, winston, xss, postgreSQL, knex.


## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/rodrigohervas/noteful-server.git NEW-PROJECT-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Make sure that the .gitignore file is encoded as 'UTF-8'
5. Install the node dependencies `npm install`
6. Add an `.env` file with the following content:
    1. NODE_ENV='development'
    2. PORT=4000
    3. DB_URL=[YOUR_CONNECTION_STRING_HERE]
7. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "noteful-server",`

Note. this server can be used woith the following client repo: https://github.com/rodrigohervas/noteful.git
(`git clone https://github.com/rodrigohervas/noteful.git NEW-PROJECT-NAME`)

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`
