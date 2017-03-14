const yo = require('yo-yo')

module.exports = function () {
  let el = yo`<div class="container">
    <div class="row">
      <ul class="nav nav-tabs">
        <li><a href="/permisos/agregar"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Permisos</a></li>
        <li><a href="/permisos/quitar"><i class="fa fa-times" aria-hidden="true"></i> Quitar permisos</a></li>
      </ul>
    </div>
    <div class="row" id="permisos-container"></div>
  </div>`
  return el
}
