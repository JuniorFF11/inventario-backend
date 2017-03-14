let el = require('./template')
const empty = require('empty-element')
const page = require('page')
const loader = require('../loader')

page('/login', loader, (ctx, next) => {
  let header = document.getElementById('header')
  empty(header)
  let container = document.getElementById('main-container')
  empty(container).appendChild(el)
  document.getElementById('contrasena').value = ''
  document.getElementById('usuario').value = ''
})
