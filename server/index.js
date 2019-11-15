require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const ctrl = require('./controller')

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

//Auth endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

//Normal endpoints


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}`)
    })
})  