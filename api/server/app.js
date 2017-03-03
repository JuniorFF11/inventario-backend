const express = require('express')
const app = express()
const usuario = require('./routers/usuario')
const bodyParser = require('body-parser')
const http = require('http')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/usuario', usuario)

module.exports = http.createServer(app)
