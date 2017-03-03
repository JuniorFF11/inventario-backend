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

test('POST /api/articulo/guardar', async t => {
  let almacen = fixtures.getAlmacen()
  let proveedor = fixtures.getProveedor()
  let articulo = fixtures.getArticulo()

  articulo.proveedorId = proveedor.proveedorId
  articulo.almacenId = almacen.almacenId

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.body = {proveedor}
  options.uri = `${url}/api/proveedor/crear`
  await request(options)

  options.body = {articulo}
  options.uri = `${url}/api/articulo/guardar`
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  delete respuesta.body.estado
  t.deepEqual(articulo, respuesta.body)
})

test('GET /api/articulo/buscar', async t => {
  let almacen = fixtures.getAlmacen()
  let proveedor = fixtures.getProveedor()
  let articulo = fixtures.getArticulo()

  articulo.proveedorId = proveedor.proveedorId
  articulo.almacenId = almacen.almacenId

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.body = {proveedor}
  options.uri = `${url}/api/proveedor/crear`
  await request(options)

  options.body = {articulo}
  options.uri = `${url}/api/articulo/guardar`
  await request(options)

  options.method = 'GET'
  options.uri = `${url}/api/articulo/buscar`
  delete options.body
  options.qs = {articulo}

  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt
  delete respuesta.body.proveedore
  delete respuesta.body.almacene

  t.is(respuesta.statusCode, 200)
  t.is(respuesta.body.articuloId, articulo.articuloId)
})

test('POST /api/articulo/guardar', async t => {
  let almacen = fixtures.getAlmacen()
  let proveedor = fixtures.getProveedor()
  let articulo = fixtures.getArticulo()

  articulo.proveedorId = proveedor.proveedorId
  articulo.almacenId = almacen.almacenId

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.body = {proveedor}
  options.uri = `${url}/api/proveedor/crear`
  await request(options)

  options.body = {articulo}
  options.uri = `${url}/api/articulo/guardar`
  let respuesta = await request(options)

  delete respuesta.body.createdAt
  delete respuesta.body.updatedAt

  t.is(respuesta.statusCode, 201)
  delete respuesta.body.estado
  t.deepEqual(articulo, respuesta.body)
})

test('PUT /api/articulo/modificar', async t => {
  let almacen = fixtures.getAlmacen()
  let proveedor = fixtures.getProveedor()
  let articulo = fixtures.getArticulo()

  articulo.proveedorId = proveedor.proveedorId
  articulo.almacenId = almacen.almacenId

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.body = {proveedor}
  options.uri = `${url}/api/proveedor/crear`
  await request(options)

  options.body = {articulo}
  options.uri = `${url}/api/articulo/guardar`
  await request(options)

  options.uri = `${url}/api/articulo/modificar`
  options.method = 'PUT'
  options.body = {articuloViejo: articulo, articuloNuevo: {descripcion: 'Foo'}}
  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.deepEqual(articulo.articuloId, respuesta.body.articuloId)
  t.deepEqual(respuesta.body.descripcion, 'Foo')
})

test('GET /api/articulo/buscararticulos', async t => {
  let almacen = fixtures.getAlmacen()
  let proveedor = fixtures.getProveedor()
  // let articulos = fixtures.getArticulos()

  let url = t.context.url
  let options = {
    method: 'POST',
    uri: `${url}/api/almacen/crear`,
    body: {almacen},
    json: true,
    resolveWithFullResponse: true
  }
  await request(options)

  options.body = {proveedor}
  options.uri = `${url}/api/proveedor/crear`
  await request(options)

  // for (let articulo of articulos) {
  //   articulo.proveedorId = proveedor.proveedorId
  //   articulo.almacenId = almacen.almacenId
  //   options.body = {articulo}
  //   options.uri = `${url}/api/articulo/guardar`
  //   await request(options)
  // }

  options.method = 'GET'
  options.uri = `${url}/api/articulo/buscararticulos`
  delete options.body
  options.qs = {articulos: {}}

  let respuesta = await request(options)
  t.is(respuesta.statusCode, 200)
})
