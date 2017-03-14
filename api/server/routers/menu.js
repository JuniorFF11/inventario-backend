const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/menu/guardar', (req, res) => {
  db.crearMenu(req.body.menu)
  .then(menu => res.status(201).json(menu.get({plain: true})))
  .catch(e => res.status(500).json(e))
})

router.get('/buscar', (req, res) => {
  db.buscarMenues(req.query.menues)
  .then(menu => {
    res.status(200).json(menu)
  })
  .catch(error => res.status(500).json(error))
})

router.put('/modificar', (req, res) => {
  db.modificarMenu(req.body.menu, req.body.nuevo)
  .then(opcion => {
    res.status(200).json(opcion.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
module.exports = router
