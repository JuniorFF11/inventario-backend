'use strict'

const navbar = require('./template')
const empty = require('empty-element')
const menu = require('./menu')

module.exports = {
  menu,
  navbar: (ctx, next) => {
    let header = document.getElementById('header')
    let el = navbar(ctx.params.menu)
    empty(header).appendChild(el)
    next()
  }
}
