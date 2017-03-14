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

module.exports = {
  tipoUsuario
}
