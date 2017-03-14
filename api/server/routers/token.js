const express = require('express')
const router = express.Router()
const token = require('../middlewares/token')

router.post('/sign', (req, res) => {
  console.log(req.body.datos)
  token.sign(req.body.datos || {usuario: 'asadsad'})
  .then(token => {
    console.log(token)
    res.status(201).json({token: token})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: error})
  })
})

router.get('/validate', (req, res) => {
  token.validate(req.token)
  .then(token => {
    console.log(token)
    res.status(200).json({token})
  })
  .catch(error => res.status(500).json({error}))
})

module.exports = router
