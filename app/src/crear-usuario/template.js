const yo = require('yo-yo')
const request = require('superagent')
const loader = require('../loader')
const swal = require('sweetalert')
const page = require('page')

module.exports = function (tipoUsuario) {
  let el = yo`
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class ="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" class="form-control" id="crearNombre" required="required"/>
          </div>
          <div class ="form-group">
            <label for="nombre">Apellido:</label>
            <input type="text" class="form-control" id="crearApellido" required="required"/>
          </div>   
        </div>
        <div class="col-xs-12 col-md-6">
          <div class ="form-group">
            <label for="nombre">Usuario:</label>
            <input type="text" class="form-control" id="crearUsuario" required="required"/>
          </div>
          <div class ="form-group">
            <label for="nombre">Contrasena:</label>
            <input type="password" class="form-control" id="crearPassword" required="required"/>
          </div>
          <div class ="form-group">
            <label for="nombre">Rol:</label>
            <select class="form-control" id="crearTipoUsuario" required="required">
              ${tipoUsuario.map(tipo => yo`<option value=${tipo.tipoUsuarioId}>${tipo.descripcion}</option>`)}
            </select>
          </div>
      </div>
      <div class="row">
        <div class="form-group">
          <div class="col-xs-4 col-xs-offset-8 text-right">
            <a class="btn btn-warning" href="/"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar</a>
            <button class="btn btn-primary" onclick=${crearUsuario}>
              <i class="fa fa-paper-plane" aria-hidden="true"></i> Crear</button>
          </div>
      </div>
    </form>
  </div>
`
  return el
}

function crearUsuario (e) {
  e.preventDefault()
  let nombre = document.getElementById('crearNombre').value
  let usuario = document.getElementById('crearUsuario').value
  let contrasena = document.getElementById('crearPassword').value
  let apellido = document.getElementById('crearApellido').value
  let tipoUsuarioId = document.getElementById('crearTipoUsuario').value
  loader(null, function () {})

  request
  .post('/api/usuario/crear')
  .send({
    usuario: {
      nombre,
      usuario,
      contrasena,
      apellido,
      tipoUsuarioId
    }
  })
  .end((err, resp) => {
    if (err) {
      swal('error', 'Ha ocurrido un error en el registro de usuario.', 'error')
      return err
    }
    swal('Exito', 'El usuario se ha registrado exitosamente', 'success')
    page.redirect('/usuario/ver')
  })
}
