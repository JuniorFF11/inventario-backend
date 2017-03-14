const yo = require('yo-yo')
const request = require('superagent')
const swal = require('sweetalert')
const empty = require('empty-element')
module.exports = function (tipoUsuario) {
  let el = yo`
    <div class="row">
        <div class="form-group">
          <label for="tipoUsuario">Rol</label>
          <select onchange=${cargarPermisos} id="tipoUsuario" class="form-control">
            <option value="0">Seleccione un rol...</option>
            ${tipoUsuario.map(tipo => yo`<option value=${tipo.nivelUsuario}>${tipo.descripcion}</option>`)}
          </select>
        </div>
    </div>
  `
  function cargarPermisos () {
    buscarPermisos().then(permisos => {
      if (permisos.length === 0) return swal('Este Rol tiene todos los permisos habilitados.')
      let container = document.getElementById('manejo-container')
      empty(container).appendChild(yo`
        <div>
          <div class="form-group">
            <label for="Permisos">Permiso</label>
            <select id="permisos" class="form-control">
            ${permisos.map(permiso => yo`<option value=${permiso.menuId}>${permiso.descripcion}</option>`)}
           </select>
          </div>
          <div class="form-group text-right">
          <a class="btn btn-warning" href="/permisos/modificar"><i class="fa fa-sign-out" aria-hidden="true"></i> Salir</a>
          <button class="btn btn-primary" onclick=${agregarPermiso}><i class="fa fa-paper-plane" aria-hidden="true"></i> Aceptar</button>
          </div>
        </div>
      `)
    })
    .catch(e => swal('Error', 'Ha ocurrido un error cargando los permisos de este rol', 'error'))
    console.log(buscarPermisos())
  }

  function agregarPermiso (e) {
    e.preventDefault()
    request
    .put('/api/menu/modificar')
    .send({
      menu: {menuId: document.getElementById('permisos').value},
      nuevo: {usuarioNivel: document.getElementById('tipoUsuario').value}
    })
    .end((err, resp) => {
      if (err) return swal('Error', 'Ha ocurrido un error actualizando el permiso', 'error')
      cargarPermisos()
      swal('Exito', 'El permiso ha sido actualizado correctamente', 'success')
    })
  }

  function buscarPermisos () {
    return new Promise((resolve, reject) => {
      let nivel = document.getElementById('tipoUsuario').value
      request.get('/api/menu/buscar')
      .query({
        menues: {
          padreId: {$ne: '0'},
          usuarioNivel: {$gt: nivel}
        }
      })
      .end((err, res) => {
        if (err) reject(err)
        resolve(JSON.parse(res.text))
      })
    })
  }
  return el
}
