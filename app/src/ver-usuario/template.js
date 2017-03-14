const yo = require('yo-yo')

module.exports = function (usuarios) {
  let el = yo`<div class="container">
    <table class="table table-hover">
      <thead>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>rol</th>
      </thead>
      <tbody>
        ${usuarios.map(usuario => {
          return yo`<tr>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.tipoUsuario.descripcion}</td>
          </tr>`
        })}
      </tbody>
    </table>
    </div>
  `
  return el
}
