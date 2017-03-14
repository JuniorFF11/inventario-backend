module.exports = function (sequelize, DataTypes) {
  return sequelize.define('menus', {
    menuId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false, defaultValue: '#'},
    estado: {type: DataTypes.ENUM('A', 'E'), allowNull: false, defaultValue: 'A'},
    usuarioNivel: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    padreId: {type: DataTypes.UUID, allowNull: false, defaultValue: '0'}

  })
}
