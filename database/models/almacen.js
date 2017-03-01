module.exports = function (sequelize, DataTypes) {
  return sequelize.define('almacenes', {
    almacenId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    descripcion: {type: DataTypes.STRING, allowNull: false, unique: true},
    estado: {type: DataTypes.ENUM('A', 'E', 'M'), allowNull: false, defaultValue: 'A'}
  })
}
