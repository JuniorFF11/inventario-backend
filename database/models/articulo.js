module.exports = function (sequelize, DataTypes) {
  return sequelize.define('articulos', {
    articuloId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    descripcion: {type: DataTypes.STRING, allowNull: false},
    costo: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    precio: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
  })
}
