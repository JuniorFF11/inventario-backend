'use strict'

require('./index.scss')
require('./assets/bootstrap-3.3.7-dist/js/bootstrap.js')
require('font-awesome-webpack')
require('font-awesome-webpack!./font-awesome/font-awesome.config.js')

const page = require('page')

require('./login')
require('./homepage')
require('./crear-usuario')
require('./modificar-usuario')
require('./eliminar-usuario')
require('./ver-usuario')
require('./crear-almacen')
require('./almacen-ver')
require('./almacen-modificar')
require('./permisos-ver')
require('./permisos-modificar')
require('./permisos-agregar')
require('./permisos-quitar')
require('./proveedor-crear')
require('./proveedor-ver')

page()
