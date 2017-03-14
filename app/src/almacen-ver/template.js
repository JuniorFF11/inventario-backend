const yo = require('yo-yo')

module.exports = function (almacenes) {
  let el = yo`<div class="container">
    <div class="col-xs-12 col-md-12 ver-almacen-titulo">
      <h3>Listado de Almacenes</h3>
    </div>
    <table class="table table-hover">
      <thead>
        <th>ID</th>
        <th>Descripcion</th>
        <th>Estado</th>
      </thead>
      <tbody>
        ${almacenes.map(almacen => {
          return yo`<tr>
          <td>${almacen.almacenId}</td>
          <td>${almacen.descripcion}</td>
          <td>${almacen.estado}</td>
          </tr>`
        })}
      </tbody>
    </table>
    </div>
  `
  return el
}
