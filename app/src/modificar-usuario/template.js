const yo = require('yo-yo')
const empty = require('empty-element')
const swal = require('sweetalert')
const request = require('superagent')
const page = require('page')
module.exports = function (usuarios, tipoUsuario) {
  let el = yo`
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class ="form-group">
            <label for="nombre">Empleado</label>
            <select class="form-control" onchange=${cargarUsuario} id="modificarUsuario">
              <option value="0">Seleccionar Usuario</option>
              ${usuarios.map(usuario => yo`<option value=${usuario.usuarioId}>${usuario.nombre} ${usuario.apellido}</option>`)}
            </select>
          </div> 
        </div>
        <div class="usuario-container"></div>
      
    </form>
  </div>
`
  function cargarUsuario () {
    let usuarioInfoContainer = document.getElementById('usuario-info')
    let usuarioSeleccionado = document.getElementById('modificarUsuario').value
    let usuario

    for (let u of usuarios) {
      if (u.usuarioId === usuarioSeleccionado) {
        usuario = u
      }
    }

    let tipoUsuarioList = tipoUsuario.map(tipo => {
      if (usuario.tipoUsuarioId === tipo.tipoUsuarioId) {
        return yo`<option value=${tipo.tipoUsuarioId} selected="selected">${tipo.descripcion}</option>`
      } else {
        return yo`<option value=${tipo.tipoUsuarioId}>${tipo.descripcion}</option>`
      }
    })

    let usuarioEl = yo`<div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input type="text" class="form-control" id="usuario" name="usuario" value=${usuario.usuario} /> 
        </div>
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre" name="nombre" value=${usuario.nombre} /> 
        </div>
        <div class="form-group">
          <label for="apellido">Apellido</label>
          <input type="text" class="form-control" id="apellido" name="apellido" value=${usuario.apellido} /> 
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label for="rol">Rol</label>
          <select class="form-control" id="tipoUsuario">
            ${tipoUsuarioList.map(tipo => tipo)}
          </select>
        </div>
        <div class="form-group">
          <label for="estado">Estado</label>
          <div class="radio">
          <label>
            <input type="radio" name="estado" id="estadoA" value="A">
            Habilitado
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="estado" id="estadoE" value="E"}>
            Deshabilitado
          </label>
        </div>    
        </div>
      </div>
        <div class="form-group">
          <div class="col-xs-4 col-xs-offset-8 text-right">
            <a href="/" class="btn btn-warning"><i class="fa fa-arrow-left" aria-hidden="true"></i> Cerrar</a>
            <button class="btn btn-primary" onclick=${modificarUsuario}>
            <i class="fa fa-paper-plane" aria-hidden="true"></i> Actualizar</button>
          </div>
    </div>`
    console.log(usuario)

    empty(usuarioInfoContainer).appendChild(usuarioEl)

    if (usuario.estado === 'A') {
      document.getElementById('estadoA').checked = true
    } else {
      document.getElementById('estadoE').checked = true
    }
  }
  function modificarUsuario (e) {
    e.preventDefault()

    swal({
      title: 'Seguro que desea modificar este usuario?',
      text: 'Seguro que desea modificar este usuario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function (isConfirm) {
      if (isConfirm) {
        procesoModificacion()
      } else {
        swal('Cancelado', 'Los cambios no han sido guardados', 'error')
      }
    })
  }

  function procesoModificacion () {
    let usuarioId = document.getElementById('modificarUsuario').value
    if (usuarioId === '0') return swal('Error', 'Debe elegir un usuario a modificar', 'error')

    let usuario = document.getElementById('usuario').value
    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value
    let tipoUsuarioId = document.getElementById('tipoUsuario').value
    let estado = document.getElementById('estadoA').checked
    estado ? estado = 'A' : estado = 'E'
    request
    .put('/api/usuario/modificar')
    .send({
      usuarioViejo: {usuarioId},
      usuarioNuevo: {
        usuario,
        nombre,
        apellido,
        tipoUsuarioId,
        estado
      }
    })
    .end((err, resp) => {
      if (err) return swal('Error', 'Ha ocurrido un error, los cambios no han sido guardados')
      swal('Exito', 'El usuario Ha sido modificado exitosamente', 'success')
      page.redirect('/configuracion/usuario/ver')
    })
  }
  return el
}

