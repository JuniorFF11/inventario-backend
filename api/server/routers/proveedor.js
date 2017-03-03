const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/crear', (req, res) => {
  db.crearProveedor(req.body.proveedor)
  .then(u => {
    res.status(201)
    .json(u.get({plain: true}))
  })
  .catch(e => res.status(500).json(e))
})

router.put('/deshabilitar', (req, res) => {
  db.deshabilitarProveedor(req.body.proveedor)
  .then(proveedor => {
    res.status(200).json(proveedor.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.put('/modificar', (req, res) => {
  db.modificarProveedor(req.body.proveedorViejo, req.body.proveedorNuevo)
  .then(proveedor => {
    res.status(200).json(proveedor.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.get('/buscar', (req, res) => {
  db.buscarProveedor(req.query.proveedor)
  .then(u => res.status(200).json(u.get({plain: true})))
  .catch(error => res.status(500).json(error))
})

module.exports = router
