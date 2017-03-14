const page = require('page')
const autorizacion = require('../utils/autorizacion')
const loader = require('../loader')
const {menu, navbar} = require('../navbar')
const template = require('./template')
const empty = require('empty-element')

page('/permisos/modificar', autorizacion(4), loader, menu, navbar, (ctx, next) => {
  let container = document.getElementById('main-container')
  empty(container).appendChild(template())
})
