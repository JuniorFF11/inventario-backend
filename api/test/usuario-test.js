const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise-native')
const fixtures = require('./fixtures')
const srv = require('../server/app')
const Database = require('../../database')

test.before(async t => {
  const db = new Database()
  await db.setup()
})

test.beforeEach(async (t) => {
  t.context.url = await listen(srv)
})

test.after(async t => {
  const db = new Database()
  await db.borrarTablas()
})

test('POST /api/usuario/tipousuario/guardar', async t => {
  let administrador = fixtures.getTiposUsuario().administrador
  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)
  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  t.deepEqual(respuesta.body, administrador)
})

test('POST /api/usuario/crear', async t => {
  let administrador = fixtures.getTiposUsuario().administrador
  let usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options = {
    method: 'POST',
    uri: `${url}/api/usuario/crear`,
    body: {usuario},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  t.is(respuesta.body.estado, 'A')
  delete respuesta.body.estado
  t.deepEqual(usuario, respuesta.body)
})

test('GET /api/usuario/buscar', async t => {
  const url = t.context.url
  const administrador = fixtures.getTiposUsuario().administrador
  const usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.uri = `${url}/api/usuario/crear`
  options.body = {usuario}
  await request(options)

  options.method = 'GET'
  options.uri = `${url}/api/usuario/buscar`
  options.qs = {usuario}
  delete options.body

  let respuesta = await request(options)
  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt
  delete respuesta.body.tipoUsuario.createdAt
  delete respuesta.body.tipoUsuario.updatedAt
  delete respuesta.body.estado
  usuario.tipoUsuario = administrador
  t.is(respuesta.statusCode, 200)
  t.deepEqual(usuario, respuesta.body)
})

test('GET /api/usuario/buscarusuarios', async t => {
  const url = t.context.url

  const administrador = fixtures.getTiposUsuario().administrador
  const usuarios = fixtures.getUsuarios()

  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  for (let usuario of usuarios) {
    usuario.tipoUsuarioId = administrador.tipoUsuarioId
    options.uri = `${url}/api/usuario/crear`
    options.body = {usuario}
    await request(options)
  }

  options.method = 'GET'
  options.uri = `${url}/api/usuario/buscarusuarios`
  delete options.body

  let respuesta = await request(options)
  t.is(respuesta.statusCode, 200)
  t.is(typeof respuesta.body, 'object', 'Deberia ser un arreglo')
  t.true(respuesta.body.length > 0)
})

test('PUT /api/usuario/deshabilitar', async t => {
  const url = t.context.url
  const administrador = fixtures.getTiposUsuario().administrador
  const usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.uri = `${url}/api/usuario/crear`
  options.body = {usuario}
  await request(options)

  options.method = 'PUT'
  options.body = {usuario}
  options.uri = `${url}/api/usuario/deshabilitar`

  let resultado = await request(options)

  t.is(resultado.body.usuarioId, usuario.usuarioId)
  t.is(resultado.body.nombre, usuario.nombre)
  t.is(resultado.body.usuario, usuario.usuario)
  t.is(resultado.body.contrasena, usuario.contrasena)
  t.is(resultado.body.estado, 'E')
})

test('PUT /api/usuario/modificar', async t => {
  const url = t.context.url
  const administrador = fixtures.getTiposUsuario().administrador
  const usuario = fixtures.getUsuario()

  usuario.tipoUsuarioId = administrador.tipoUsuarioId

  let options = {
    method: 'POST',
    uri: `${url}/api/usuario/tipousuario/guardar`,
    body: {tipoUsuario: administrador},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.uri = `${url}/api/usuario/crear`
  options.body = {usuario}
  await request(options)

  options.method = 'PUT'
  options.body = {usuarioViejo: usuario, usuarioNuevo: {nombre: 'Foo-912', usuario: 'Foo-user'}}
  options.uri = `${url}/api/usuario/modificar`

  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.is(respuesta.body.usuarioId, usuario.usuarioId)
  t.is(respuesta.body.nombre, 'Foo-912')
  t.is(respuesta.body.usuario, 'Foo-user')
})
