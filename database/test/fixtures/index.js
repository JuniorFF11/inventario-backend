const uuid = require('uuid')

function getUsuario () {
  return {
    usuarioId: uuid.v4(),
    nombre: `Foo-${uuid.v4()}`,
    apellido: `bar-${uuid.v4()}`,
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

function getUsuarios () {
  return [
    getUsuario(),
    getUsuario(),
    getUsuario(),
    getUsuario(),
    getUsuario()
  ]
}
function getArticulo () {
  return {
    articuloId: uuid.v4(),
    descripcion: `descripcion-${uuid.v4()}`,
    proveedorId: uuid.v4(),
    almacenId: uuid.v4()
  }
}
function getArticulos () {
  return [
    getArticulo(),
    getArticulo(),
    getArticulo(),
    getArticulo(),
    getArticulo()
  ]
}
function getAlmacen () {
  return {
    almacenId: uuid.v4(),
    descripcion: `Almacen-${uuid.v4()}`
  }
}
function getAlmacenes () {
  return [
    getAlmacen(),
    getAlmacen(),
    getAlmacen(),
    getAlmacen(),
    getAlmacen()
  ]
}
module.exports = {
  getUsuario,
  getTiposUsuario,
  getProveedor,
  getProveedores,
  getUsuarios,
  getArticulo,
  getArticulos,
  getAlmacen,
  getAlmacenes
}
