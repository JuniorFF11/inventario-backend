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
      usuario = usuario || {}
      try {
        let usuarioEncontrado = yield models.Usuario.find({where: usuario, include: [{model: models.TipoUsuario}]})
        if (!usuarioEncontrado) throw new Error('Usuario no encontrado')
        delete usuarioEncontrado.contrasena
        return Promise.resolve(usuarioEncontrado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  deshabilitarUsuario (usuario) {
    if (!usuario || usuario === {}) throw new Error('Necesita un usuario para desahabilitar')
    let proceso = co.wrap(function* () {
      try {
        let encontrado = yield models.Usuario.find({where: usuario})
        yield encontrado.update({estado: 'E'})
        return Promise.resolve(encontrado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  modificarUsuario (usuarioViejo, usuarioNuevo) {
    let proceso = co.wrap(function* () {
      try {
        let usuario = yield models.Usuario.find({where: usuarioViejo})
        if (!usuario) throw new Error('Usuario no encontrado')
        let nuevo = JSON.parse(JSON.stringify(usuarioNuevo))
        delete nuevo.usuarioId
        yield usuario.update(nuevo)
        return Promise.resolve(usuario)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  crearProveedor (proveedor) {
    let proceso = co.wrap(function* () {
      try {
        let proveedorGuardado = yield models.Proveedor.create(proveedor)
        if (!proveedorGuardado) throw new Error('El proveedor no ha podido ser guardado.')
        return Promise.resolve(proveedorGuardado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarProveedor (proveedor) {
    proveedor = proveedor || {}
    let proceso = co.wrap(function* () {
      try {
        let encontrado = models.Proveedor.find({where: proveedor})
        if (!encontrado) throw new Error('El proveedor no fue encontrado.')
        return Promise.resolve(encontrado)
      } catch (e) {
        Promise.reject(e.toString())
      }
    })
    return Promise.resolve(proceso())
  }

  deshabilitarProveedor (proveedor) {
    if (!proveedor || proveedor === {}) throw new Error('Debe definir proveedor a desahabilitar')
    const buscarProveedor = this.buscarProveedor
    let proceso = co.wrap(function* () {
      try {
        let resultado = yield buscarProveedor(proveedor)
        if (!resultado) throw new Error('El proveedor no fue encontrado.')
        resultado.update({estado: 'E'})
        return Promise.resolve(resultado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  modificarProveedor (proveedorViejo, proveedorNuevo) {
    if (!proveedorViejo || proveedorViejo === {}) throw new Error('Debe definir proveedor a desahabilitar')
    const buscarProveedor = this.buscarProveedor
    let proceso = co.wrap(function* () {
      try {
        let resultado = yield buscarProveedor(proveedorViejo)
        if (!resultado) throw new Error('El proveedor no fue encontrado.')
        resultado.update(proveedorNuevo)
        return Promise.resolve(resultado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
}

module.exports = Database

