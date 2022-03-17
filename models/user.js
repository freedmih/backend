'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Task, { foreignKey: 'user_id', onDelete: 'cascade'} );
    }

    validPassword = password => {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init({
    login: DataTypes.STRING(20),
    password: DataTypes.STRING(72)
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};