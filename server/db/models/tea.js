'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    static associate(models) {
      Tea.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Tea.hasMany(models.Comment, { foreignKey: 'teaId', onDelete: 'CASCADE' });
    }
  }

  Tea.init({
    name: DataTypes.STRING,
    cultivationPlace: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Tea',
  });

  return Tea;
};
