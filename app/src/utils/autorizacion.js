'use strict'
const request = require('superagent')
const page = require('page')
const swal = require('sweetalert')

module.exports = function (nivel) {
  return function (ctx, next) {
    if (window.localStorage.tokenApp) {
      console.log(window.localStorage.tokenApp)
      request.get(`/api/token/validate`)
      .set('Authorization', window.localStorage.tokenApp)
      .end((err, resp) => {
        if (err) {
          console.log(err)
          swal('Error', 'Necesita loguearse para acceder', 'error')
          page.redirect('/login')
        }
        resp.body = JSON.parse(resp.text)
        if (resp.body.token.usuario && resp.body.token.usuarioId && resp.body.token.tipoUsuarioId) {
          window.localStorage.usuario = resp.body.token.usuario
          window.localStorage.id = resp.body.token.usuarioId
          if (resp.body.token.estado === 'E') return swal('Error', 'Este usuario ha sido baneado del sistema.', 'error')
          if (nivel <= resp.body.token.tipoUsuario.nivelUsuario) {
            next()
          } else {
            swal('Error', 'Esta cuenta no tiene suficientes privilegios para acceder a esta opcion.', 'error')
            page.redirect('/')
          }
        } else {
          swal('Error', 'Necesita loguearse para acceder', 'error')
          page.redirect('/login')
        }
      })
    } else {
      swal('Error', 'Necesita loguearse para acceder', 'error')
      page.redirect('/login')
    }
  }
}
