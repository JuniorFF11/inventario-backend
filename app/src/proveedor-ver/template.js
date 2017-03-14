const yo = require('yo-yo')

module.exports = function (proveedores) {
  let el = yo`<div class="container">
    <table class="table table-hover">
      <thead>
        <th>Nombre</th>
        <th>Telefono</th>
        <th>Contacto</th>
        <th>Direccion</th>
      </thead>
      <tbody>
        ${proveedores.map(proveedor => {
          return yo`<tr>
          <td>${proveedor.nombre}</td>
          <td>${proveedor.telefono}</td>
          <td>${proveedor.contacto}</td>
          <td>${proveedor.direccion}</td>
          </tr>`
        })}
      </tbody>
    </table>
    </div>
  `
  return el
}
