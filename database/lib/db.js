const {sequelize, models} = require('./sequelize')
const co = require('co')

class Database {
  setup (options) {
    options = options || {}
    let tarea = co.wrap(function* () {
      try {
        yield sequelize.sync(options)
        return Promise.resolve('tablas creadas correctamente')
      } catch (e) {
        return Promise.reject(e)
      }
    })
    return Promise.resolve(tarea())
  }

  guardarTipoUsuario (tipoUsuario) {
    let tarea = co.wrap(function* () {
      try {
        let tipoUsuarioGuardado = yield models.TipoUsuario.create(tipoUsuario)
        return Promise.resolve(tipoUsuarioGuardado)
      } catch (e) {
        return Promise.reject({error: 'No se ha podido guardar el tipo de usuario.'})
      }
    })
    return Promise.resolve(tarea())
  }

  borrarTablas () {
    let tarea = co.wrap(function* () {
      try {
        yield sequelize.drop()
        return Promise.resolve('Tablas borradas correctamente.')
      } catch (e) {
        return Promise.reject('Ha ocurrido un error al intentar borrar las tablas')
      }
    })

    return Promise.resolve(tarea())
  }

  crearUsuario (usuario) {
    let proceso = co.wrap(function* () {
      try {
        let usuarioGuardado = yield models.Usuario.create(usuario)
        return Promise.resolve(usuarioGuardado)
      } catch (e) {
        return Promise.reject({error: 'El usuario no ha podido ser creado'})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarUsuario (usuario) {
    let proceso = co.wrap(function* () {
      try {
        let usuarioEncontrado = yield models.Usuario.findAll({where: usuario})

        return Promise.resolve(usuarioEncontrado)
      } catch (e) {
        return Promise.reject({error: 'No se ha podido encontrar este usuario'})
      }
    })

    return Promise.resolve(proceso())
  }
}

module.exports = Database

