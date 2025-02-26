'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Comment.belongsTo(models.Tea, { foreignKey: 'teaId', onDelete: 'CASCADE' });
    }
  }

  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    teaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Teas',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
