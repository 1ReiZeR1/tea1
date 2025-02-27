'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
<<<<<<< HEAD
      User.hasMany(models.Tea, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
=======
>>>>>>> mainpage
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN, 
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
