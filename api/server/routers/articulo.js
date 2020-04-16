const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/guardar', (req, res) => {
  req.body.articulo.proveedorId = 'bd19bf2a-6a64-41b3-8e3d-968230d542e0'
  db.guardarArticulo(req.body.articulo)
  .then(articulo => {
    res.status(201)
    .json(articulo.get({plain: true}))
  })
  .catch(e => {
    console.log(e)
    res.status(500).json(e)
  })
})

router.get('/buscar/:articulo', (req, res) => {
  db.buscarArticulo({articuloId: req.params.articulo})
  .then(articulo => res.status(200).json(articulo.get({plain: true})))
  .catch(error => res.status(500).json(error))
})

router.put('/modificar', (req, res) => {
  db.modificarArticulo(req.body.articuloViejo, req.body.articuloNuevo)
  .then(articulo => {
    res.status(200).json(articulo.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.get('/buscararticulos', (req, res) => {
  db.buscarArticulos()
  .then(articulo => res.status(200).json(articulo))
  .catch(error => { res.status(500).json(error) })
})

module.exports = router
