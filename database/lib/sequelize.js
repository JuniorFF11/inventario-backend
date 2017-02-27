const Sequelize = require('sequelize')
const config = require('./config')
const sequelize = new Sequelize(config['DB_NAME'], config['DB_USER'], config['DB_PASSWORD'])
const path = require('path')

let Usuario = sequelize.import(path.join(__dirname, '/../models/usuario'))
let TipoUsuario = sequelize.import(path.join(__dirname, '/../models/tipoUsuario'))
let Almacen = sequelize.import(path.join(__dirname, '/../models/almacen'))
let Proveedor = sequelize.import(path.join(__dirname, '/../models/proveedor'))
let TipoMovimiento = sequelize.import(path.join(__dirname, '/../models/tipoMovimiento'))
let Log = sequelize.import(path.join(__dirname, '/../models/log'))
let Inventario = sequelize.import(path.join(__dirname, '/../models/inventario'))
let Articulo = sequelize.import(path.join(__dirname, '/../models/articulo'))

Usuario.belongsTo(TipoUsuario, {foreignKey: {name: 'tipoUsuarioId', allowNull: false}})
Log.belongsTo(TipoMovimiento, {foreignKey: {name: 'tipoMovimientoId', allowNull: false}})
Log.belongsTo(Usuario, {foreignKey: {name: 'usuarioId', allowNull: false}})
Almacen.hasMany(Articulo, {foreignKey: {name: 'almacenId', allowNull: false}})
Proveedor.hasMany(Articulo, {foreignKey: {name: 'proveedorId', allowNull: false}})
Articulo.hasOne(Inventario, {foreignKey: {name: 'articuloId', allowNull: false}})

module.exports = {
  sequelize,
  models: {
    Usuario,
    TipoUsuario,
    Almacen,
    Proveedor,
    TipoMovimiento,
    Log,
    Inventario,
    Articulo
  }
}

