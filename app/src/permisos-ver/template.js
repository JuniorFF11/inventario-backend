const yo = require('yo-yo')

module.exports = function (tipoUsuarios, funcionalidades) {
  let el = yo`<div class="container">
    <div class="col-xs-12 col-md-12 ver-almacen-titulo">
      <h3>Permisos</h3>
    </div>
      ${tipoUsuarios.map(tipo => {
        return yo`
          <table class="table table-hover table-bordered table-striped">
            <thead>
              <tr>
                <th class="ver-almacen-titulo">${tipo.descripcion}</th>
              </tr>
            </thead>
            <tbody>
              ${funcionalidades.map(funcionalidad => {
                if (tipo.nivelUsuario >= funcionalidad.usuarioNivel) {
                  return yo`
                  <tr>
                      <td>${funcionalidad.descripcion}</td>
                  </tr>`
                }
              })}
            </tbody>
          </table>
        `
      })}
    </div>
  `
  return el
}
