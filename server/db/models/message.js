'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like }) {
      Message.belongsTo(User, { foreignKey: 'userId' });
      Message.hasMany(Like, { foreignKey: 'messageId' });
    }
  }
  Message.init({
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    countLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};