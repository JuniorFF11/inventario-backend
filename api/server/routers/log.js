const express = require('express')
const router = express.Router()
const Database = require('../../../database')
const db = new Database()
<<<<<<< HEAD
const axios = require('axios')
=======
>>>>>>> 946fccef92ec5436a8a72f851d6205207a8dc6a4

router.post('/', (req, res) => {
  db.crearLog(req.body.log)
  .then(() => {
    res.status(201)
    .json({response: 'Guardado'})
  })
  .catch((e) => {
    res.status(500)
    .json(e)
  })
<<<<<<< HEAD
})

router.get('/', (req, res) => {
  db.buscarLogs()
  .then((response) => {
    res.status(201)
    .json({response})
  })
  .catch((e) => {
    res.status(500)
    .json(e)
  })
})

router.put('/', (req, res) => {
  db.modificarLog(req.body.logViejo, req.body.logNuevo)
  .then(l => {
    res.status(200).json(l)
  })
  .catch(error => {
	console.log(error)
    res.status(500).json(error)
  })
})

router.post('/accountingEntry',  (req, res) => {
    let accountingUri = 'https://sistemacontabilidad5.azurewebsites.net'
    let endpoint = '/api/ApiEntradaContables'
    let options = {
      method: 'POST',
      data: req.body
    }
    console.log(options)
    axios('https://sistemacontabilidad5.azurewebsites.net/api/ApiEntradaContables', options).then((response) => {
    	console.log(response)
	return res.json(response.data)
    })
})
module.exports = router

=======
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
>>>>>>> 946fccef92ec5436a8a72f851d6205207a8dc6a4
