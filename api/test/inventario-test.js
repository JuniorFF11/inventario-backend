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

test('POST /api/inventario/actualizar', async t => {
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

  options.body = {articulo: {articuloId: articulo.articuloId}, propiedades: {costo: 100, precio: 150}}
  options.uri = `${url}/api/inventario/actualizar`
  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.deepEqual(articulo.articuloId, respuesta.body.articuloId)
  t.is(respuesta.body.costo, 100)
  t.is(respuesta.body.precio, 150)

  options.body = {articulo: {articuloId: articulo.articuloId}, propiedades: {costo: 300, precio: 150}}
  respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.deepEqual(articulo.articuloId, respuesta.body.articuloId)
  t.is(respuesta.body.costo, 300)
})

test('PUT /api/inventario/deshabilitar', async t => {
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

  options.body = {articulo: {articuloId: articulo.articuloId}, propiedades: {costo: 100, precio: 150}}
  options.uri = `${url}/api/inventario/actualizar`
  let inventario = await request(options)

  options.method = 'PUT'
  options.body = {inventario: {inventarioId: inventario.inventarioId, articuloId: inventario.articuloId}}
  options.uri = `${url}/api/inventario/deshabilitar`

  let respuesta = await request(options)

  t.is(respuesta.statusCode, 200)
  t.is(respuesta.body.estado, 'E')
})
