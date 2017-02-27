
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tipoUsuario', {
    tipoUsuarioId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    nivelUsuario: {type: DataTypes.INTEGER, allowNull: false}
  })
}
