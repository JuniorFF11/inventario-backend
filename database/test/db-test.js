const test = require('ava')
const Database = require('../')
const fixtures = require('./fixtures')
const uuid = require('uuid')

test.before(async t => {
  const db = new Database()
  await db.setup({force: true})
})

test.after(async t => {
  const db = new Database()
  await db.borrarTablas()
})

test('Crear tipo de usuario test', async t => {
  const db = new Database()
  t.is(typeof db.guardarTipoUsuario, 'function', 'Deberia ser una funcion')

  let tiposUsuario = fixtures.getTiposUsuario()
  let administrador = tiposUsuario.administrador
  let tipoUsuarioGuardado = await db.guardarTipoUsuario(administrador)

  t.deepEqual(tipoUsuarioGuardado.tipoUsuarioId, administrador.tipoUsuarioId)
  t.deepEqual(tipoUsuarioGuardado.nivelUsuario, administrador.nivelUsuario)
  t.deepEqual(tipoUsuarioGuardado.descripcion, administrador.descripcion)
})

test('Crear usuario.', async t => {
  const db = new Database()
  t.is(typeof db.crearUsuario, 'function', 'Deberia ser una funcion')

  let tiposUsuario = fixtures.getTiposUsuario()
  let administrador = tiposUsuario.administrador
  let usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  await db.guardarTipoUsuario(administrador)
  let usuarioGuardado = await db.crearUsuario(usuario)

  t.deepEqual(usuario.usuarioId, usuarioGuardado.usuarioId)
  t.deepEqual(usuario.nombre, usuarioGuardado.nombre)
  t.deepEqual(usuario.apellido, usuarioGuardado.apellido)
  t.deepEqual(usuario.usuario, usuarioGuardado.usuario)
  t.deepEqual(usuario.contrasena, usuarioGuardado.contrasena)
})

test('Buscar usuario', async t => {
  const db = new Database()
  t.is(typeof db.buscarUsuario, 'function', 'Deberia ser una funcion')
  let tiposUsuario = fixtures.getTiposUsuario()
  let administrador = tiposUsuario.administrador
  let usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  await db.guardarTipoUsuario(administrador)
  let usuarioGuardado = await db.crearUsuario(usuario)
  let usuarioEncontrado = await db.buscarUsuario({usuarioId: usuarioGuardado.usuarioId})
  t.deepEqual(usuarioEncontrado.usuarioId, usuarioGuardado.usuarioId)
  t.deepEqual(usuarioEncontrado.nombre, usuarioGuardado.nombre)
  t.deepEqual(usuarioEncontrado.apellido, usuarioGuardado.apellido)
  t.deepEqual(usuarioEncontrado.usuario, usuarioGuardado.usuario)
  t.deepEqual(usuarioEncontrado.contrasena, usuarioGuardado.contrasena)
})

test('deshabilitar/borrar usuario', async t => {
  const db = new Database()

  t.is(typeof db.deshabilitarUsuario, 'function', 'Deberia ser una funcion')

  let tiposUsuario = fixtures.getTiposUsuario()
  let administrador = tiposUsuario.administrador
  let usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  await db.guardarTipoUsuario(administrador)
  let usuarioGuardado = await db.crearUsuario(usuario)
  let resultado = await db.deshabilitarUsuario({usuarioId: usuarioGuardado.usuarioId})

  t.deepEqual(resultado.usuarioId, usuarioGuardado.usuarioId)
  t.deepEqual(resultado.nombre, usuarioGuardado.nombre)
  t.deepEqual(resultado.apellido, usuarioGuardado.apellido)
  t.deepEqual(resultado.usuario, usuarioGuardado.usuario)
  t.deepEqual(resultado.contrasena, usuarioGuardado.contrasena)
  t.deepEqual(resultado.estado, 'E')
})

test('Modificar usuario', async t => {
  const db = new Database()

  t.is(typeof db.modificarUsuario, 'function', 'Deberia ser una funcion')

  let tiposUsuario = fixtures.getTiposUsuario()
  let administrador = tiposUsuario.administrador
  let usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  await db.guardarTipoUsuario(administrador)
  let usuarioGuardado = await db.crearUsuario(usuario)
  let usuarioModificado = JSON.parse(JSON.stringify(usuarioGuardado))
  usuarioModificado.usuario = 'Foo'
  let resultado = await db.modificarUsuario({usuarioId: usuarioGuardado.usuarioId}, {usuario: 'Foo'})

  t.deepEqual(usuarioModificado.usuarioId, resultado.usuarioId)
  t.deepEqual(usuarioModificado.usuario, resultado.usuario)
  t.deepEqual(usuarioModificado.nombre, resultado.nombre)
  t.deepEqual(usuarioModificado.contrasena, resultado.contrasena)
  t.deepEqual(usuarioModificado.tipoUsuarioId, resultado.tipoUsuarioId)
  t.deepEqual(usuarioModificado.apellido, resultado.apellido)
})

test('Crear Proveedor', async t => {
  const db = new Database()
  t.is(typeof db.crearProveedor, 'function', 'Deberia ser una funcion')

  let proveedor = fixtures.getProveedor()
  let proveedorGuardado = await db.crearProveedor(proveedor)

  t.deepEqual(proveedor.proveedorId, proveedorGuardado.proveedorId)
  t.deepEqual(proveedor.contacto, proveedorGuardado.contacto)
  t.deepEqual(proveedor.telefono, proveedorGuardado.telefono)
  t.deepEqual(proveedor.nombre, proveedorGuardado.nombre)
})

test('Buscar Proveedor', async t => {
  const db = new Database()
  t.is(typeof db.buscarProveedor, 'function', 'Deberia ser una funcion.')

  let proveedor = fixtures.getProveedor()
  let proveedorGuardado = await db.crearProveedor(proveedor)
  let proveedorEncontrado = await db.buscarProveedor({proveedorId: proveedorGuardado.proveedorId})

  t.deepEqual(proveedorEncontrado.proveedorId, proveedorGuardado.proveedorId)
  t.deepEqual(proveedorEncontrado.contacto, proveedorGuardado.contacto)
  t.deepEqual(proveedorEncontrado.telefono, proveedorGuardado.telefono)
  t.deepEqual(proveedorEncontrado.nombre, proveedorGuardado.nombre)
})

test('Deshabilitar Proveedor', async t => {
  const db = new Database()
  t.is(typeof db.deshabilitarProveedor, 'function', 'Deberia ser una funcion')

  let proveedor = fixtures.getProveedor()
  await db.crearProveedor(proveedor)

  let proveedorDeshabilitado = await db.deshabilitarProveedor(proveedor)

  t.deepEqual(proveedorDeshabilitado.proveedorId, proveedor.proveedorId)
  t.deepEqual(proveedorDeshabilitado.contacto, proveedor.contacto)
  t.deepEqual(proveedorDeshabilitado.telefono, proveedor.telefono)
  t.deepEqual(proveedorDeshabilitado.nombre, proveedor.nombre)
  t.deepEqual(proveedorDeshabilitado.estado, 'E')
})

test('Modificar Proveedor', async t => {
  const db = new Database()
  t.is(typeof db.modificarProveedor, 'function', 'Deberia ser una funcion')

  let proveedor = fixtures.getProveedor()
  await db.crearProveedor(proveedor)

  let proveedorModificado = await db.modificarProveedor(proveedor, {nombre: 'Foo', contacto: 'bar'})

  t.deepEqual(proveedorModificado.proveedorId, proveedor.proveedorId)
  t.deepEqual(proveedorModificado.contacto, 'bar')
  t.deepEqual(proveedorModificado.telefono, proveedor.telefono)
  t.deepEqual(proveedorModificado.nombre, 'Foo')
  t.deepEqual(proveedorModificado.estado, 'A')
})

test('buscar Proveedores', async t => {
  const db = new Database()
  t.is(typeof db.buscarProveedores, 'function', 'Deberia ser una funcion')

  let proveedores = fixtures.getProveedores()
  await proveedores.map(proveedor => db.crearProveedor(proveedor))

  let resultado = await db.buscarProveedores()

  t.true(resultado.length > 0)
  t.true(resultado[1].nombre !== undefined)
  resultado = await db.buscarProveedores({nombre: uuid.v4()})
  t.true(resultado.length <= 0)
})
