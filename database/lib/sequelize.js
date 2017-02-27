const Sequelize = require('sequelize')
const path = require('path')
const config = require('./config')
const sequelize = new Sequelize(config['DB_NAME'], config['DB_USER'], config['DB_PASSWORD'])

let usuario = sequelize.import(path.join(__dirname, '/../models/usuario'))
let tipoUsuario = sequelize.import(path.join(__dirname, '/../models/tipoUsuario'))
let almacen = sequelize.import(path.join(__dirname, '/../models/almacen'))
let proveedor = sequelize.import(path.join(__dirname, '/../models/proveedor'))
let tipoMovimiento = sequelize.import(path.join(__dirname, '/../models/tipoMovimiento'))
let log = sequelize.import(path.join(__dirname, '/../models/log'))
let inventario = sequelize.import(path.join(__dirname, '/../models/inventario'))
let articulo = sequelize.import(path.join(__dirname, '/../models/articulo'))

sequelize.sync({force: true})
.then(x => {
  console.log('Los modelos fueron creados satisfactoriamente')
})

module.exports = sequelize
