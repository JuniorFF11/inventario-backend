const request = require('request-promise-native')

const defaults = {
  endpoint: 'inventario.unapec.test'
}
// class Cliente {
//   constructor (options = defaults) {
//     this.options = options
//   }
//   validarUsuario (usuario) {
//     const options = {
//       method: 'GET',
//       uri: `${this.options.endpoint}/usuario/buscar`,
//       qs: usuario,
//       json: true
//     }
//     return Promise.resolve(request(options))
//   }

// }

function Cliente (options) {
  this.options = options || defaults
}

Cliente.prototype.validarUsuario = function validarUsuario (usuario) {
  const options = {
    method: 'GET',
    uri: `${this.options.endpoint}/usuario/buscar`,
    qs: usuario,
    json: true
  }
  return Promise.resolve(request(options))
}
module.exports = Cliente
