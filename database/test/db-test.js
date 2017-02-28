const test = require('ava')
const Database = require('../')
const fixtures = require('./fixtures')

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

  t.true(usuarioEncontrado.length > 0)
  usuarioEncontrado = usuarioEncontrado[0]
  t.deepEqual(usuarioEncontrado.usuarioId, usuarioGuardado.usuarioId)
  t.deepEqual(usuarioEncontrado.nombre, usuarioGuardado.nombre)
  t.deepEqual(usuarioEncontrado.apellido, usuarioGuardado.apellido)
  t.deepEqual(usuarioEncontrado.usuario, usuarioGuardado.usuario)
  t.deepEqual(usuarioEncontrado.contrasena, usuarioGuardado.contrasena)
})
