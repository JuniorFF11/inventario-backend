const Database = require('./')
const {models} = require('./lib/sequelize')
const co = require('co')
let db = new Database()

co(function * () {
  yield db.borrarTablas()
  yield db.setup()

  // let administrador = yield db
  //   .guardarTipoUsuario({
  //     descripcion: 'Encargado Tecnologia',
  //     nivelUsuario: 4
  //   })

  // yield db
  //   .guardarTipoUsuario({
  //     descripcion: 'Gerente de Logistica',
  //     nivelUsuario: 3
  //   })

  // yield db
  //   .guardarTipoUsuario({
  //     descripcion: 'Encargado de Almacen',
  //     nivelUsuario: 2
  //   })

  // yield db
  //   .guardarTipoUsuario({
  //     descripcion: 'Auxiliar Almacen',
  //     nivelUsuario: 1
  //   })
  // yield db.crearUsuario({
  //   nombre: 'Emry',
  //   usuario: 'emry',
  //   apellido: 'Rosario',
  //   contrasena: 'test123',
  //   tipoUsuarioId: administrador.tipoUsuarioId
  // })

  // let usuarioMenu = yield models.Menu.create({
  //   descripcion: 'Usuarios',
  //   link: '/usuario',
  //   usuarioNivel: 4
  // })
  // yield models.Menu.create({
  //   descripcion: 'Crear Usuario',
  //   link: '/usuario/crear',
  //   usuarioNivel: 4,
  //   padreId: usuarioMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Modificar Usuario',
  //   link: '/usuario/modificar',
  //   usuarioNivel: 4,
  //   padreId: usuarioMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Ver Usuario',
  //   link: '/usuario/ver',
  //   usuarioNivel: 4,
  //   padreId: usuarioMenu.menuId
  // })

  // let almacenMenu = yield models.Menu.create({
  //   descripcion: 'Almacenes',
  //   link: '/almacen',
  //   usuarioNivel: 1
  // })

  // yield models.Menu.create({
  //   descripcion: 'Crear Almacen',
  //   link: '/almacen/crear',
  //   usuarioNivel: 2,
  //   padreId: almacenMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Modificar Almacen',
  //   link: '/almacen/modificar',
  //   usuarioNivel: 2,
  //   padreId: almacenMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Ver Almacen',
  //   link: '/almacen/ver',
  //   usuarioNivel: 1,
  //   padreId: almacenMenu.menuId
  // })

  // let proveedorMenu = yield models.Menu.create({
  //   descripcion: 'Proveedores',
  //   link: '/proveedor',
  //   usuarioNivel: 3
  // })

  // yield models.Menu.create({
  //   descripcion: 'Crear Proveedor',
  //   link: '/proveedor/crear',
  //   usuarioNivel: 2,
  //   padreId: proveedorMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Modificar Proveedor',
  //   link: '/proveedor/modificar',
  //   usuarioNivel: 2,
  //   padreId: proveedorMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Ver proveedor',
  //   link: '/proveedor/ver',
  //   usuarioNivel: 1,
  //   padreId: proveedorMenu.menuId
  // })

  // let inventarioMenu = yield models.Menu.create({
  //   descripcion: 'Inventario',
  //   link: '/inventario',
  //   usuarioNivel: 1
  // })

  // yield models.Menu.create({
  //   descripcion: 'Agregar Mercancia',
  //   link: '/inventario/crear',
  //   usuarioNivel: 1,
  //   padreId: inventarioMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Modificar Mercancia',
  //   link: '/inventario/modificar',
  //   usuarioNivel: 2,
  //   padreId: inventarioMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Ver Inventario',
  //   link: '/inventario/ver',
  //   usuarioNivel: 1,
  //   padreId: inventarioMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Salida Inventario',
  //   link: '/inventario/salida',
  //   usuarioNivel: 2,
  //   padreId: inventarioMenu.menuId
  // })
  // yield models.Menu.create({
  //   descripcion: 'Ajustar Inventario',
  //   link: '/inventario/ajustar',
  //   usuarioNivel: 2,
  //   padreId: inventarioMenu.menuId
  // })

  // let permisoMenu = yield models.Menu.create({
  //   descripcion: 'Permisos',
  //   link: '/permisos',
  //   usuarioNivel: 4
  // })

  // yield models.Menu.create({
  //   descripcion: 'Modificar Permisos',
  //   link: '/permisos/modificar',
  //   usuarioNivel: 4,
  //   padreId: permisoMenu.menuId
  // })

  // yield models.Menu.create({
  //   descripcion: 'Ver permisos',
  //   link: '/permisos/ver',
  //   usuarioNivel: 4,
  //   padreId: permisoMenu.menuId
  // })
  // yield models.Log.drop()

  // yield models.Log.create()
  console.log('Setup Finalizado.')
})
