const express = require('express')
const app = express()
const usuario = require('./routers/usuario')
const proveedor = require('./routers/proveedor')
const bodyParser = require('body-parser')
const http = require('http')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/usuario', usuario)
app.use('/api/proveedor', proveedor)

module.exports = http.createServer(app)
