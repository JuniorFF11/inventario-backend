const request = require('superagent')

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
  buscarUsuarios
}
