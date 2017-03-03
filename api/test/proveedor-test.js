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
  .then(x => console.log(x))
  .catch(x => console.log(x))
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
