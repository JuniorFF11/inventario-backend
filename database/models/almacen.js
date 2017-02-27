module.exports = function (sequelize, DataTypes) {
  return sequelize.define('almacenes', {
    almacenId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    numero: {type: DataTypes.INTEGER, allowNull: false, unique: true}
  })
}
