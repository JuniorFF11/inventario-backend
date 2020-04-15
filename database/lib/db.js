const {sequelize, models} = require('./sequelize')
const co = require('co')

class Database {
  setup (options) {
    options = options || {}
    let tarea = co.wrap(function * () {
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
    let tarea = co.wrap(function * () {
      try {
        let tipoUsuarioGuardado = yield models.TipoUsuario.create(tipoUsuario)
        return Promise.resolve(tipoUsuarioGuardado)
      } catch (e) {
        console.log(e)
        return Promise.reject({error: 'No se ha podido guardar el tipo de usuario.'})
      }
    })
    return Promise.resolve(tarea())
  }
  buscarTipoUsuario () {
    let proceso = co.wrap(function * () {
      try {
        let tipoUsuarios = yield models.TipoUsuario.findAll()
        return Promise.resolve(tipoUsuarios)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  borrarTablas () {
    let tarea = co.wrap(function * () {
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
    let proceso = co.wrap(function * () {
      try {
        let usuarioGuardado = yield models.Usuario.create(usuario)
        return Promise.resolve(usuarioGuardado)
      } catch (e) {
        console.log(e)
        return Promise.reject({error: 'El usuario no ha podido ser creado'})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarUsuario (usuario) {
    let proceso = co.wrap(function * () {
      usuario = usuario || {}
      try {
        if (typeof usuario === 'string') JSON.parse(usuario)
        console.log(typeof usuario)

        let usuarioEncontrado = yield models.Usuario.findOne({where: usuario, include: [{model: models.TipoUsuario}]})
        if (!usuarioEncontrado) throw new Error('Usuario no encontrado')
        delete usuarioEncontrado.contrasena
        return Promise.resolve(usuarioEncontrado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  buscarUsuarios (condicion) {
    condicion = condicion || {}

    let proceso = co.wrap(function * () {
      try {
        let usuarios = yield models.Usuario.findAll({where: condicion, include: [{model: models.TipoUsuario}]})
        if (!usuarios) throw new Error('No se encontraron usuarios')
        return Promise.resolve(usuarios)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  deshabilitarUsuario (usuario) {
    if (!usuario || usuario === {}) throw new Error('Necesita un usuario para desahabilitar')
    let proceso = co.wrap(function * () {
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
    let proceso = co.wrap(function * () {
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
    let proceso = co.wrap(function * () {
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
    if (!proveedor) throw new Error('debe Especificar algun dato del proveedor')
    let proceso = co.wrap(function * () {
      try {
        let encontrado = models.Proveedor.findOne({where: proveedor})
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
    let proceso = co.wrap(function * () {
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
    let proceso = co.wrap(function * () {
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

  buscarProveedores (condicion) {
    condicion = condicion || {}
    let proceso = co.wrap(function * () {
      try {
        let proveedores = yield models.Proveedor.findAll({where: condicion})
        if (!proveedores) throw new Error('No se encontraron proveedores.')
        return Promise.resolve(proveedores)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  crearAlmacen (almacen) {
    if (!almacen) throw new Error('Se necesita un almacen para ser guardado.')
    let proceso = co.wrap(function * () {
      try {
        let almacenGuardado = yield models.Almacen.create(almacen)
        if (!almacenGuardado) throw new Error('El almacen no ha podido ser guardado.')
        return Promise.resolve(almacenGuardado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  crearInventario (inventario) {
    if (!inventario) throw new Error('Se necesita un inventario para ser guardado.')
    let proceso = co.wrap(function * () {
      try {
        let inventarioGuardado = yield models.Inventario.create(inventario)
        if (!inventarioGuardado) throw new Error('El inventario no ha podido ser guardado.')
        return Promise.resolve(inventarioGuardado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  buscarAlmacen (almacen) {
    if (!almacen) throw new Error('Debe especificar el almacen')
    let proceso = co.wrap(function * () {
      try {
        if (typeof almacen !== 'object') almacen = JSON.parse(almacen)
        let encontrado = models.Almacen.findOne({where: almacen})
        if (!encontrado) throw new Error('El Almacen no fue encontrado.')
        return Promise.resolve(encontrado)
      } catch (e) {
        Promise.reject(e.toString())
      }
    })
    return Promise.resolve(proceso())
  }
  buscarInventario (inventario) {
    if (!inventario) throw new Error('Debe especificar el inventario')
    let proceso = co.wrap(function * () {
      try {
        if (typeof inventario !== 'object') inventario = JSON.parse(inventario)
        let encontrado = models.Inventario.findOne({where: inventario})
        if (!encontrado) throw new Error('El inventario no fue encontrado.')
        return Promise.resolve(encontrado)
      } catch (e) {
        Promise.reject(e.toString())
      }
    })
    return Promise.resolve(proceso())
  }
  deshabilitarAlmacen (almacen) {
    if (!almacen || almacen === {}) throw new Error('Debe definir almacen a desahabilitar')
    const buscarAlmacen = this.buscarAlmacen
    let proceso = co.wrap(function * () {
      try {
        let resultado = yield buscarAlmacen(almacen)
        if (!resultado) throw new Error('El almacen no fue encontrado.')
        resultado.update({estado: 'E'})
        return Promise.resolve(resultado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  modificarAlmacen (almacenViejo, almacenNuevo) {
    let buscarAlmacen = this.buscarAlmacen
    let proceso = co.wrap(function * () {
      try {
        console.log(almacenViejo, almacenNuevo)
        if (!almacenViejo || !almacenNuevo) throw new Error('No se ha podido modificar el almacen, datos incompletos.')
        let almacen = yield buscarAlmacen(almacenViejo)
        if (!almacen) throw new Error('No se ha encontrado este almacen.')
        yield almacen.update(almacenNuevo)
        return Promise.resolve(almacen)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  modificarInventario (inventarioViejo, inventarioNuevo) {
    let buscarInventario = this.buscarInventario
    let proceso = co.wrap(function * () {
      try {
        console.log(inventarioViejo, inventarioNuevo)
        if (!inventarioViejo || !inventarioNuevo) throw new Error('No se ha podido modificar el inventario, datos incompletos.')
        let inventario = yield buscarInventario(inventarioViejo)
        if (!inventario) throw new Error('No se ha encontrado este almacen.')
        yield inventario.update(inventarioNuevo)
        return Promise.resolve(inventario)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  buscarAlmacenes (condicion) {
    condicion = condicion || {}
    let proceso = co.wrap(function * () {
      try {
        let almacenes = yield models.Almacen.findAll({where: condicion})
        if (!almacenes) throw new Error('No se encontraron almacenes')
        return Promise.resolve(almacenes)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarInventarios (condicion) {
    condicion = condicion || {}
    let proceso = co.wrap(function * () {
      try {
        let inventarios = yield models.Inventario.findAll({where: condicion})
        if (!inventarios) throw new Error('No se encontraron inventarios')
        return Promise.resolve(inventarios)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  guardarArticulo (articulo) {
    let proceso = co.wrap(function * () {
      try {
        let guardado = yield models.Articulo.create(articulo)
        if (!guardado) throw new Error('El articulo no pudo ser guardado.')
        return Promise.resolve(guardado)
      } catch (e) {
        console.log(e)
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
  buscarArticulo (articulo) {
    let proceso = co.wrap(function * () {
      try {
        let articuloEncontrado = yield models.Articulo
          .findOne({
            where: articulo,
            include: [
              {
                model: models.Proveedor
              },
              {
                model: models.Almacen
              },
              {
                model: models.Inventario
              }
            ]})
        if (!articuloEncontrado) throw new Error('El articulo no ha sido encontrado.')
        return Promise.resolve(articuloEncontrado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarArticulos (condicion) {
    condicion = condicion || {}
    let proceso = co.wrap(function * () {
      try {
        let articulos = yield models.Articulo.findAll({where: condicion,
          include: [
            {
              model: models.Proveedor
            },
            {
              model: models.Almacen
            },
            {
              model: models.Inventario
            }
          ]
        })
        if (!articulos) throw new Error('No se encontraron articulos.')
        return Promise.resolve(articulos)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  modificarArticulo (articuloViejo, articuloNuevo) {
    let buscarArticulo = this.buscarArticulo
    let proceso = co.wrap(function * () {
      try {
        if (!articuloViejo || !articuloNuevo) throw new Error('No se ha podido modificar el articulo')
        let articulo = yield buscarArticulo(articuloViejo)
        if (!articulo) throw new Error('El articulo no pudo ser encontrado')
        yield articulo.update(articuloNuevo)
        return Promise.resolve(articulo)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  actualizarInventario (articulo, propiedades) {
    let proceso = co.wrap(function * () {
      try {
        if (!articulo) {
          articulo = {}
          articulo.costo = propiedades.costo
          articulo.precio = propiedades.precio
          articulo.cantidad = propiedades.cantidad
          articulo.id = articulo.articuloId || propiedades.articuloId
          articuloInventario = yield models.Inventario.create(articulo)
          return Promise.resolve(articuloInventario)
        }
        let articuloInventario = yield models.Inventario.findOne({where: articulo})
        if (!articuloInventario) {
          articulo.costo = propiedades.costo
          articulo.precio = propiedades.precio
          articulo.cantidad = propiedades.cantidad
          articuloInventario = yield models.Inventario.create(articulo)
          return Promise.resolve(articuloInventario)
        }
        yield articuloInventario.update(propiedades)
        return Promise.resolve(articuloInventario)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  deshabilitarInventario (inventario) {
    if (!inventario) throw new Error('Se necesita un inventario a deshabilitar')
    let proceso = co.wrap(function * () {
      try {
        let resultado = yield models.Inventario.findOne({where: inventario})
        if (!resultado) throw new Error('El inventario no fue encontrado')
        resultado.update({estado: 'E'})
        return Promise.resolve(resultado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  crearMenu (menu) {
    let proceso = co.wrap(function * () {
      try {
        let usuarioGuardado = yield models.Menu.create(menu)
        return Promise.resolve(usuarioGuardado)
      } catch (e) {
        return Promise.reject({error: 'El menu no ha podido ser creado'})
      }
    })
    return Promise.resolve(proceso())
  }

  buscarMenues (condicion) {
    condicion = condicion || {}

    let proceso = co.wrap(function * () {
      try {
        let menues = yield models.Menu.findAll({where: condicion})
        if (!menues) throw new Error('No se encontraron menues')
        return Promise.resolve(menues)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })

    return Promise.resolve(proceso())
  }

  modificarMenu (menu, nuevo) {
    let proceso = co.wrap(function * () {
      try {
        if (!menu || !nuevo) throw new Error('No se ha podido modificar el articulo')
        let opcion = yield models.Menu.findOne({where: menu})
        if (!opcion) throw new Error('El menu no pudo ser encontrado')
        yield opcion.update(nuevo)
        return Promise.resolve(opcion)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }

  guardarMovimiento (movimiento) {
    if (!movimiento) throw new Error('Se necesita un movimiento para ser guardado.')
    let proceso = co.wrap(function * () {
      try {
        let movimientoGuardado = yield models.TipoMovimiento.create(movimiento)
        if (!movimientoGuardado) throw new Error('El movimiento no ha podido ser guardado.')
        return Promise.resolve(movimientoGuardado)
      } catch (e) {
        return Promise.reject({error: e.toString()})
      }
    })
    return Promise.resolve(proceso())
  }
}

module.exports = Database
