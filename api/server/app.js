const express = require('express')
const app = express()
const usuario = require('./routers/usuario')
const proveedor = require('./routers/proveedor')
const almacen = require('./routers/almacen')
const articulo = require('./routers/articulo')
const inventario = require('./routers/inventario')
const bodyParser = require('body-parser')
const http = require('http')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api/usuario', usuario)
app.use('/api/proveedor', proveedor)
app.use('/api/almacen', almacen)
app.use('/api/articulo', articulo)
app.use('/api/inventario', inventario)

module.exports = http.createServer(app)
