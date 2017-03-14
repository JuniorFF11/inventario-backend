const request = require('superagent')

function buscarAlmacenes (ctx, next) {
  request('/api/almacen/buscarAlmacenes')
  .end((err, resp) => {
    if (err) {
      ctx.params.almacenes = []
      next()
    }
    ctx.params.almacenes = JSON.parse(resp.text)
    next()
  })
}

module.exports = {
  buscarAlmacenes
}
