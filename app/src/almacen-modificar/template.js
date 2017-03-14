const yo = require('yo-yo')
const empty = require('empty-element')
const swal = require('sweetalert')
const request = require('superagent')
const page = require('page')
module.exports = function (almacenes) {
  let el = yo`
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class ="form-group">
            <label for="nombre">Almacen</label>
            <select class="form-control" onchange=${cargarAlmacen} id="modificarAlmacen">
              <option value="0">Seleccionar Almacen</option>
              ${almacenes.map(almacen => yo`<option value=${almacen.almacenId}>${almacen.descripcion}</option>`)}
            </select>
          </div> 
        </div>
        <div class="usuario-container"></div>
      
    </form>
  </div>
`
  function cargarAlmacen () {
    let almacenSeleccionado = document.getElementById('modificarAlmacen').value
    let almacenContainer = document.getElementById('almacen-info')

    let almacen

    for (let a of almacenes) {
      if (a.almacenId === almacenSeleccionado) {
        almacen = a
        break
      }
    }
    console.log(almacen)

    let almacenEl = yo`
      <div class="row">
        <div class="col-xs-6">
          <div class="form-group">
            <label for="descripcion">Descripcion</label>
            <input type="text" id="descripcion" class="form-control" name="descripcion" value=${almacen.descripcion} />
          </div>
          </div>

          <div class="col-xs-6">
            <div class="form-group"><label for="estado">Estado</label></div>
          <div class="form-group">
            <div class="radio">
              <label>
                <input type="radio" name="estado" id="estadoA" value="A">
                Activo
              </label>
          </div>

           <div class="radio">
              <label>
                <input type="radio" name="estado" id="estadoE" value="E">
                inactivo
              </label>
          </div>

           <div class="radio">
              <label>
                <input type="radio" name="estado" id="estadoM" value="M">
                Mantenimiento
              </label>
          </div>



          </div>
          </div>
          <div class="form-group">
            <div class="col-xs-4 col-xs-offset-8 text-right">
              <a href="/" class="btn btn-warning"><i class="fa fa-arrow-left" aria-hidden="true"></i> Cerrar</a>
              <button class="btn btn-primary" onclick=${modificarAlmacen}>
              <i class="fa fa-paper-plane" aria-hidden="true"></i> Actualizar</button>
            </div>
          </div>
        </div>
    `
    empty(almacenContainer).appendChild(almacenEl)

    document.getElementById(`estado${almacen.estado}`).checked = true
  }

  function modificarAlmacen (e) {
    e.preventDefault()

    swal({
      title: 'Seguro que desea modificar este Almacen?',
      text: 'Seguro que desea modificar este Almacen?',
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

    function procesoModificacion () {
      let almacen = document.getElementById('modificarAlmacen').value
      let descripcion = document.getElementById('descripcion').value

      let estado

      if (document.getElementById('estadoA').checked) {
        estado = 'A'
      } else if (document.getElementById('estadoE').checked) {
        estado = 'E'
      } else if (document.getElementById('estadoM').checked) {
        estado = 'M'
      }
      request
      .put('/api/almacen/modificar')
      .send({
        almacenViejo: {almacenId: almacen},
        almacenNuevo: {
          descripcion,
          estado
        }
      })
      .end((err, resp) => {
        if (err) return swal('Error', 'Ha ocurrido un error actualizando este almacen.', 'error')
        swal('Exit', 'El almacen ha sido actualizado satisfactoriamente', 'success')
        page.redirect('/almacen/ver')
      })
    }
  }
  return el
}
