const Sequelize = require('sequelize')
const config = require('./config')
const sequelize = new Sequelize({database: config['DB_NAME'], username: config['DB_USER'], password: config['DB_PASSWORD'], dialect: 'mysql', timezone: 'GMT-4'})
const path = require('path')

let Usuario = sequelize.import(path.join(__dirname, '/../models/usuario'))
let TipoUsuario = sequelize.import(path.join(__dirname, '/../models/tipoUsuario'))
let Almacen = sequelize.import(path.join(__dirname, '/../models/almacen'))
let Proveedor = sequelize.import(path.join(__dirname, '/../models/proveedor'))
let TipoMovimiento = sequelize.import(path.join(__dirname, '/../models/tipoMovimiento'))
let Log = sequelize.import(path.join(__dirname, '/../models/log'))
let Inventario = sequelize.import(path.join(__dirname, '/../models/inventario'))
let Articulo = sequelize.import(path.join(__dirname, '/../models/articulo'))
let Menu = sequelize.import(path.join(__dirname, '/../models/menu'))

Usuario.belongsTo(TipoUsuario, {foreignKey: {name: 'tipoUsuarioId', allowNull: false}})
Log.belongsTo(TipoMovimiento, {foreignKey: {name: 'tipoMovimientoId', allowNull: false}})
Log.belongsTo(Usuario, {foreignKey: {name: 'usuarioId', allowNull: false}})
Log.belongsTo(Articulo, {foreignKey: {name: 'articuloId', allowNull: false}})
Almacen.hasMany(Articulo, {foreignKey: {name: 'almacenId', allowNull: false}})
Articulo.belongsTo(Almacen, {foreignKey: {name: 'almacenId', allowNull: false}})


// Proveedor.hasMany(Articulo, {foreignKey: {name: 'proveedorId', allowNull: false}})

Articulo.belongsTo(Proveedor, {foreignKey: {name: 'proveedorId', allowNull: false}})
>>>>>>> 946fccef92ec5436a8a72f851d6205207a8dc6a4
Articulo.belongsTo(Inventario, {foreignKey: {name: 'inventarioId', allowNull: false}})
//Articulo.hasMany(Log, {foreignKey : {name: 'articuloId', allowNull: false}})
// Articulo.hasMany(Inventario, {foreignKey: {name: 'articuloId', allowNull: false}})
// Inventario.belongsToMany(Articulo, {through: 'inventario`', foreignKey: {name: 'articuloId', allowNull: false}})
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
    Articulo,
    Menu
  }
}
