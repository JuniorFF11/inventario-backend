module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logs', {
    logId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    estado: {type: DataTypes.STRING(3), defaultValue: 'NC', allowNull: false},
    cantidad: { type: DataTypes.INTEGER, defaultValue: 0,  allowNull: false}
  })
}
