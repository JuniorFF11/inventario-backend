const yo = require('yo-yo')
const request = require('superagent')
const loader = require('../loader')
const swal = require('sweetalert')
const page = require('page')

module.exports = function () {
  let el = yo`
  <div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class ="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="crearNombre" required="required"/>
      </div>
      <div class ="form-group">
        <label for="telefono">Telefono</label>
        <input type="text" class="form-control" id="crearTelefono" required="required" max="12"/>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class ="form-group">
        <label for="direccion">Direccion</label>
        <textarea class="form-control" rows="3" id="crearDireccion"></textarea>
      </div>
      <div class ="form-group">
        <label for="contacto">Contacto</label>
        <input type="text" class="form-control" id="crearContacto" required="required"/>
      </div>
    </div>
  </div> 
  <div class="row">
    <div class="col-xs-12 text-right">
      <div class="form-group">
        <a class="btn btn-warning" href="/"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar</a>
        <button class="btn btn-primary" onclick=${crearProveedor}>
        <i class="fa fa-paper-plane" aria-hidden="true"></i> Crear</button>
      </div>
    </div>
  </div>   
</div>
`
  return el
}

function crearProveedor (e) {
  e.preventDefault()
  let nombre = document.getElementById('crearNombre').value
  let telefono = document.getElementById('crearTelefono').value
  let direccion = document.getElementById('crearDireccion').value
  let contacto = document.getElementById('crearContacto').value
  loader(null, function () {})

  request
  .post('/api/proveedor/crear')
  .send({
    proveedor: {
      nombre,
      telefono,
      direccion,
      contacto
    }
  })
  .end((err, resp) => {
    if (err) {
      swal('error', 'Ha ocurrido un error en el registro del Proveedor.', 'error')
      return err
    }
    swal('Exito', 'El proveedor se ha registrado exitosamente', 'success')
    page.redirect('/proveedor/ver')
  })
}
