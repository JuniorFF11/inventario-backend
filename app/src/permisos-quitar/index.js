const page = require('page')
const autorizacion = require('../utils/autorizacion')
const {menu, navbar} = require('../navbar')
const template = require('./template')
const empty = require('empty-element')
const yo = require('yo-yo')
const {tipoUsuario} = require('./utils')

page('/permisos/quitar', autorizacion(4), menu, navbar, tipoUsuario, (ctx, next) => {
  let appContainer = document.getElementById('main-container')
  empty(appContainer).appendChild(yo`<div class="container">
    <div class="row">
      <ul class="nav nav-tabs">
        <li ><a href="/permisos/agregar"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Permisos</a></li>
        <li class="active"><a href="/permisos/quitar"><i class="fa fa-times" aria-hidden="true"></i> Quitar permisos</a></li>
      </ul>
    </div>
    <div class="row" id="permisos-container"></div>
  </div>`)

  let container = document.getElementById('permisos-container')
  empty(container).appendChild(yo`
    <div  id="quitar-permiso-container">
      <div class="row">
        <div id="rol-container" class="container col-xs-12 col-md-6"></div>
        <div class="col-xs-12 col-md-6 container" id="manejo-container"></div>
      </div>
    </div>
    `)
  let rolContainer = document.getElementById('rol-container')

  empty(rolContainer).appendChild(template(ctx.params.tipoUsuario))
})
