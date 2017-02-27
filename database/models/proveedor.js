module.exports = function (sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    proveedorId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: {type: DataTypes.STRING, allowNull: false, unique: true},
    telefono: {type: DataTypes.STRING(10)},
    direccion: {type: DataTypes.TEXT},
    contacto: {type: DataTypes.STRING}
  })
}
