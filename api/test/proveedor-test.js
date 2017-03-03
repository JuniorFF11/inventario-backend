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

test('POST /api/proveedor/crear', async t => {
  let proveedor = fixtures.getProveedor()

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/proveedor/crear`,
    body: {proveedor},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  t.is(respuesta.body.estado, 'A')
  delete respuesta.body.estado
  t.deepEqual(proveedor, respuesta.body)
})

test('GET /api/proveedor/buscar', async t => {
  const url = t.context.url
  const proveedor = fixtures.getProveedor()

  let options = {
    method: 'POST',
    uri: `${url}/api/proveedor/crear`,
    body: {proveedor},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options = {
    method: 'GET',
    uri: `${url}/api/proveedor/buscar`,
    qs: {proveedor},
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt
  delete respuesta.body.estado
  t.is(respuesta.statusCode, 200)
  t.deepEqual(proveedor, respuesta.body)
})

test('PUT /api/proveedor/deshabilitar', async t => {
  const url = t.context.url
  const proveedor = fixtures.getProveedor()

  let options = {
    method: 'POST',
    uri: `${url}/api/proveedor/crear`,
    body: {proveedor},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.method = 'PUT'
  options.uri = `${url}/api/proveedor/deshabilitar`
  options.body = {proveedor}

  let resultado = await request(options)
  t.is(resultado.body.proveedorId, proveedor.proveedorId)
  t.is(resultado.body.estado, 'E')
  t.is(resultado.body.contacto, proveedor.contacto)
  t.is(resultado.body.nombre, proveedor.nombre)
})

test('PUT /api/proveedor/modificar', async t => {
  const url = t.context.url
  const proveedor = fixtures.getProveedor()

  let options = {
    method: 'POST',
    uri: `${url}/api/proveedor/crear`,
    body: {proveedor},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.method = 'PUT'
  options.uri = `${url}/api/proveedor/modificar`
  options.body = {proveedorViejo: proveedor, proveedorNuevo: {nombre: 'Foo', contacto: 'bar', telefono: 'xxx-xxx-xxxx'}}

  let resultado = await request(options)

  t.is(resultado.body.proveedorId, proveedor.proveedorId)
  t.is(resultado.body.contacto, 'bar')
  t.is(resultado.body.nombre, 'Foo')
  t.is(resultado.body.telefono, 'xxx-xxx-xxxx')
  t.is(resultado.body.direccion, proveedor.direccion)
})

test('GET /api/proveedor/buscarproveedores', async t => {
  const url = t.context.url
  const proveedores = fixtures.getProveedores()

  let options = {
    method: 'POST',
    uri: `${url}/api/proveedor/crear`,
    body: {},
    json: true,
    resolveWithFullResponse: true
  }
  for (let proveedor of proveedores) {
    options.body.proveedor = proveedor
    await request(options)
  }

  options = {
    method: 'GET',
    uri: `${url}/api/proveedor/buscarproveedores`,
    json: true,
    resolveWithFullResponse: true
  }
  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.true(respuesta.body.length > 0)
})
