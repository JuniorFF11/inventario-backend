const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/tipousuario/guardar', (req, res) => {
  db.guardarTipoUsuario(req.body.tipoUsuario)
  .then(tipoUsuario => res.status(201).json(tipoUsuario.get({plain: true})))
  .catch(e => res.status(500).json(e))
})

router.get('/tipousuario/ver', (req, res) => {
  db.buscarTipoUsuario()
  .then(tipoUsuario => res.status(200).json(tipoUsuario))
  .catch(e => res.status(500).json(e))
})

router.post('/crear', (req, res) => {
  console.log(req.body.usuario)
  db.crearUsuario(req.body.usuario)
  .then(u => {
    res.status(201)
    .json(u.get({plain: true}))
  })
  .catch(e => {
    console.log(e)
    res.status(500).json(e)
  })
})

router.get('/buscar', (req, res) => {
  db.buscarUsuario(req.query.usuario)
  .then(u => {
    let usuario = u.get({plain: true})
    delete usuario.contrasena
    res.status(200).json(usuario)
  })
  .catch(error => res.status(500).json(error))
})

router.get('/buscarusuarios', (req, res) => {
  db.buscarUsuarios(req.query.usuarios || undefined)
  .then(u => {
    let usuario = u.map(usuario => {
      delete usuario.contrasena
      return usuario
    })
    res.status(200).json(usuario)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
})

router.put('/deshabilitar', (req, res) => {
  db.deshabilitarUsuario(req.body.usuario)
  .then(usuario => {
    res.status(200).json(usuario.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

router.put('/modificar', (req, res) => {
  db.modificarUsuario(req.body.usuarioViejo, req.body.usuarioNuevo)
  .then(usuario => {
    res.status(200).json(usuario.get({plain: true}))
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
module.exports = router
