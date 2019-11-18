require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const ctrl = require('./controller')
const checkForSession = require("../server/middleware/checkForSession");

const app = express();

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))
// app.use(checkForSession);

//Auth endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)
app.get('/auth/getSession', ctrl.getSession)
app.get('/api/auth/me', ctrl.getUser)

//Normal endpoints
app.get(`/api/posts`, ctrl.getAllPosts)
app.post('/api/post', ctrl.addPost)
app.get('/api/post/:id', ctrl.getPost)
app.put('/api/post', ctrl.editPost)
app.get('/api/posts/:id', ctrl.getNonUserPosts)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}`)
    })
})  