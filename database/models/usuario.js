
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usuario', {
    usuarioId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    usuario: {type: DataTypes.STRING, unique: true},
    contrasena: {type: DataTypes.STRING, allowNull: false},
    estado: {type: DataTypes.ENUM('A', 'E'), allowNull: false, defaultValue: 'A'}
  })
}
