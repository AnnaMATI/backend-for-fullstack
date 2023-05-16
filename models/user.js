'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
    }
  }
  Users.init({
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    email:DataTypes.TEXT,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return Users;
};
