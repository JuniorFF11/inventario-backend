module.exports = function (sequelize, DataTypes) {
  return sequelize.define('inventarios', {
    inventarioId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    descripcion: {type: DataTypes.STRING, allowNull: false, unique: true},
    cuentaContable: {type: DataTypes.STRING},
    estado: {type: DataTypes.ENUM('A', 'E'), allowNull: false, defaultValue: 'A'}
  })
}
