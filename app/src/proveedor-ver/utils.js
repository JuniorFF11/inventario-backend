const request = require('superagent')

function buscarProveedores (ctx, next) {
  request('/api/proveedor/buscarproveedores')
  .end((err, resp) => {
    if (err) {
      ctx.params.proveedores = []
      next()
    }
    ctx.params.proveedores = JSON.parse(resp.text)
    next()
  })
}

module.exports = {
  buscarProveedores
}
