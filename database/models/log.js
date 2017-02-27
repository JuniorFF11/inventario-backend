module.exports = function (sequelize, DataTypes) {
  return sequelize.define('logs', {
    logId: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4}
  })
}
