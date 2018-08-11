const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/actualizar', (req, res) => {
  db.actualizarInventario(req.body.articulo, req.body.propiedades)
  .then(articulo => {
    res.status(200)
    .json(articulo.get({plain: true}))
  })
  .catch(e => res.status(500).json(e))
})
router.get('/', (req, res) => {
  db.buscarInventarios(req.query.inventarios)
  .then(inventarios => res.status(200).json(inventarios))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
})

router.get('/:id', (req, res) => {
  db.buscarInventario({inventarioId: req.params.id})
  .then(inventario => res.status(200).json(inventario.get({plain: true})))
  .catch(error => res.status(500).json(error))
})

router.post('/', (req, res) => {
  db.crearInventario(req.body.inventario)
  .then(inventario => {
    res.status(201)
    .json(inventario.get({plain: true}))
  })
  .catch(e => {
    res.status(500).json(e)
  })
})
router.put('/', (req, res) => {
  db.modificarInventario(req.body.inventarioViejo, req.body.inventarioNuevo)
  .then(inventario => {
    res.status(200).json(inventario.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
router.put('/deshabilitar', (req, res) => {
  db.deshabilitarInventario(req.body.inventario)
  .then(inventario => {
    res.status(200).json(inventario.get({plain: true}))
  })
  .catch(error => res.status(500).json(error))
})

module.exports = router
