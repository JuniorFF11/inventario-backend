const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()

router.post('/', (req, res) => {
  Promise.all([
    db.guardarMovimiento({
      descripcion: 'Entrada'
    }),
    db.guardarMovimiento({
      descripcion: 'Salida'
    })
  ])
  .then(() => {
    res.status(201)
    .json({response: 'Guardado'})
  })
  .catch((e) => {
    res.status(500)
    .json(e)
  })
  // db.guardarMovimiento(req.body.)
  // .then(articulo => {
  //   res.status(201)
  //   .json(articulo.get({plain: true}))
  // })
  // .catch(e => {
  //   console.log(e)
  //   res.status(500).json(e)
  // })
})


module.exports = router
