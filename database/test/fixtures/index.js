const uuid = require('uuid')

function getUsuario () {
  return {
    usuarioId: uuid.v4(),
    nombre: `Juan-${uuid.v4()}`,
    apellido: `Palito-${uuid.v4()}`,
    usuario: `usuario-${uuid.v4()}`,
    tipoUsuarioId: uuid.v4(),
    contrasena: uuid.v4()
  }
}

function getTiposUsuario () {
  return {
    administrador: {
      tipoUsuarioId: uuid.v4(),
      descripcion: 'Administrador',
      nivelUsuario: 1
    }
  }
}

module.exports = {
  getUsuario,
  getTiposUsuario
}