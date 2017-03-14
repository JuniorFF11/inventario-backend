const page = require('page')
const autorizacion = require('../utils/autorizacion')
const loader = require('../loader')
const {menu, navbar} = require('../navbar')
const swal = require('sweetalert')
const request = require('superagent')
page('/almacen/crear', autorizacion(3), loader, menu, navbar, (ctx, next) => {
  swal({
    title: 'Crear Almacen',
    text: 'Escriba el nombre de el almacen:',
    type: 'input',
    showCancelButton: true,
    closeOnConfirm: false,
    animation: 'slide-from-top',
    inputPlaceholder: 'Nombre Almacen aqui.'
  },
  function (inputValue) {
    if (inputValue === false) return page.redirect('/')

    if (inputValue === '') {
      swal.showInputError('Necesita escribir el nombre del almacen')
      return page.redirect('/almacen/crear')
    }
    request
    .post('/api/almacen/crear')
    .send({
      almacen: {descripcion: inputValue}
    })
    .end((err, resp) => {
      if (err) {
        swal('Error', 'Ha ocurrido un error, asegurese de que el almacen no exista', 'error')
        return page.redirect('/almacen/ver')
      }
      swal('Exito', 'El almacen ha sido registrado correctamente', 'success')
      page.redirect('/almacen/ver')
    })
  })
})
