const request = require('superagent')

function buscarTipoUsuarios (ctx, next) {
  request
  .get('/api/usuario/tipousuario/ver')
  .end((err, resp) => {
    if (err) {
      ctx.params.tipoUsuario = []
      next()
    }
    ctx.params.tipoUsuarios = JSON.parse(resp.text)
    next()
  })
}

function buscarFuncionalidades (cxt, next) {
  request.get('/api/menu/buscar')
  .query({menues: {padreId: {$ne: '0'}}})
  .end((err, res) => {
    if (err) console.log(err)
    cxt.params.funcionalidades = JSON.parse(res.text)
    next()
  })
}

module.exports = {
  buscarTipoUsuarios,
  buscarFuncionalidades
}
