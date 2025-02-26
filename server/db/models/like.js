'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Message }) {
      Like.belongsTo(User, { foreignKey: 'userId' });
      Like.belongsTo(Message, { foreignKey: 'messageId' });
    }
  }
  Like.init({
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};