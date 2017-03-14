const jwt = require('jsonwebtoken')
const {secretKey} = require('../config')

function sign (payload, opts) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, opts, (err, token) => {
      if (err) reject(secretKey)
      resolve('Bearer ' + token)
    })
  })
}

function validate (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
module.exports = {
  sign,
  validate
}
