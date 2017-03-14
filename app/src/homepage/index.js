const page = require('page')
const autorizacion = require('../utils/autorizacion')
const loader = require('../loader')
const {menu, navbar} = require('../navbar')
page('/', autorizacion(1), loader, menu, navbar, (ctx, next) => {
})
