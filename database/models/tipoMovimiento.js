module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tipoMovimientos', {
    tipoMovimientoId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    descripcion: {type: DataTypes.STRING, unique: true, allowNull: false}
  })
}
