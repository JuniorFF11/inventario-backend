module.exports = function (sequelize, DataTypes) {
  return sequelize.define('inventarios', {
    inventarioId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    costo: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    precio: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    cantidad: {type: DataTypes.INTEGER, allowNull: false}
  })
}
