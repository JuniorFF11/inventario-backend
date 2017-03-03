const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/tipousuario/guardar', (req, res) => {
  db.guardarTipoUsuario(req.body.tipoUsuario)
  .then(tipoUsuario => res.status(201).json(tipoUsuario.get({plain: true})))
  .catch(e => res.status(500).json(e))
})

router.post('/crear', (req, res) => {
  db.crearUsuario(req.body.usuario)
  .then(u => {
    res.status(201)
    .json(u.get({plain: true}))
  })
  .catch(e => res.status(500).json(e))
})

router.get('/buscar', (req, res) => {
  db.buscarUsuario(req.query.usuario)
  .then(u => res.status(200).json(u.get({plain: true})))
  .catch(error => res.status(500).json(error))
})

router.get('/buscarusuarios', (req, res) => {
  db.buscarUsuarios(req.query.usuarios || undefined)
  .then(u => res.status(200).json(u))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
})

module.exports = router
