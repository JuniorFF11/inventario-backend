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

router.put('/deshabilitar', (req, res) => {
  db.deshabilitarInventario(req.body.inventario)
  .then(inventario => {
    res.status(200).json(inventario.get({plain: true}))
  })
  .catch(error => res.status(500).json(error))
})

module.exports = router
