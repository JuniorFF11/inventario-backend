const Cliente = require('./lib/cliente')

function crearCliente (opciones) {
  return new Cliente(opciones)
}

module.exports = {crearCliente}
