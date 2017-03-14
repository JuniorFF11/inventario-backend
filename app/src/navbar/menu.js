'use strict'

const request = require('superagent')

function menu (cxt, next) {
  request.get(`/api/token/validate`)
  .set('Authorization', window.localStorage.tokenApp)
  .end((err, resp) => {
    if (err) return err
    let respuesta = JSON.parse(resp.text)
    request.get('/api/menu/buscar')
  .query({menues: {usuarioNivel: {$lte: respuesta.token.tipoUsuario.nivelUsuario}}})
  .end((err, res) => {
    if (err) console.log(err)
    cxt.params.menu = JSON.parse(res.text)
    next()
  })
  })
}
module.exports = menu
