const request = require('superagent')

function tipoUsuario (ctx, next) {
  request
  .get('/api/usuario/tipousuario/ver')
  .end((err, resp) => {
    if (err) {
      ctx.params.tipoUsuario = []
      next()
    }
    ctx.params.tipoUsuario = JSON.parse(resp.text)
    next()
  })
}

function buscarUsuarios (ctx, next) {
  request('/api/usuario/buscarusuarios')
  .end((err, resp) => {
    if (err) {
      ctx.params.usuarios = []
      next()
    }
    ctx.params.usuarios = JSON.parse(resp.text)
    next()
  })
}

module.exports = {
  tipoUsuario,
  usuarios: buscarUsuarios
}
