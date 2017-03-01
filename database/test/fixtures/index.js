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

function getProveedor () {
  return {
    proveedorId: uuid.v4(),
    nombre: `proveedor-${uuid.v4()}`,
    telefono: uuid.v4().substring(0, 9),
    direccion: `Direccion-${uuid.v4()}`,
    contacto: `Contacto-${uuid.v4()}`
  }
}

function getProveedores () {
  return [
    getProveedor(),
    getProveedor(),
    getProveedor(),
    getProveedor(),
    getProveedor()
  ]
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
  getTiposUsuario,
  getProveedor,
  getProveedores
}
