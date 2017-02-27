module.exports = function (sequelize, DataTypes) {
  return sequelize.define('articulos', {
    articuloId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    descripcion: {type: DataTypes.STRING, allowNull: false, unique: true}
  })
}
