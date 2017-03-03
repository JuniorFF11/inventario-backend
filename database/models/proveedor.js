module.exports = function (sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    proveedorId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {type: DataTypes.STRING, allowNull: false, unique: true},
    telefono: {type: DataTypes.STRING(13)},
    direccion: {type: DataTypes.TEXT},
    contacto: {type: DataTypes.STRING},
    estado: {type: DataTypes.ENUM('A', 'E'), allowNull: false, defaultValue: 'A'}
  })
}
