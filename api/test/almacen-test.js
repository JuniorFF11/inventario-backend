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

test('POST /api/almacen/crear', async t => {
  let almacen = fixtures.getAlmacen()

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  t.is(respuesta.body.estado, 'A')
  delete respuesta.body.estado
  t.deepEqual(almacen, respuesta.body)
})

test('GET /api/almacen/buscar', async t => {
  const url = t.context.url
  const almacen = fixtures.getAlmacen()

  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options = {
    method: 'GET',
    uri: `${url}/api/almacen/buscar`,
    qs: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt
  delete respuesta.body.estado
  t.is(respuesta.statusCode, 200)
  t.deepEqual(almacen, respuesta.body)
})

test('PUT /api/proveedor/deshabilitar', async t => {
  const url = t.context.url
  const almacen = fixtures.getAlmacen()

  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.method = 'PUT'
  options.uri = `${url}/api/almacen/deshabilitar`
  options.body = {almacen}

  let resultado = await request(options)
  t.is(resultado.statusCode, 200)
  t.is(resultado.body.almacenId, almacen.almacenId)
  t.is(resultado.body.estado, 'E')
  t.is(resultado.body.descripcion, almacen.descripcion)
})

test('PUT /api/almacen/modificar', async t => {
  const url = t.context.url
  const almacen = fixtures.getAlmacen()

  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.method = 'PUT'
  options.uri = `${url}/api/almacen/modificar`
  options.body = {almacenViejo: almacen, almacenNuevo: {descripcion: 'Foo-almacen'}}

  let resultado = await request(options)

  t.is(resultado.statusCode, 200)
  t.is(resultado.body.almacenId, almacen.almacenId)
  t.is(resultado.body.descripcion, 'Foo-almacen')
})

test('GET /api/almacen/buscaralmacenes', async t => {
  const url = t.context.url
  const almacenes = fixtures.getAlmacenes()

  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {},
    json: true,
    resolveWithFullResponse: true
  }
  for (let almacen of almacenes) {
    options.body.almacen = almacen
    await request(options)
  }

  options = {
    method: 'GET',
    uri: `${url}/api/almacen/buscaralmacenes`,
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.true(respuesta.body.length > 0)
})
