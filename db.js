const { Sequelize, DataTypes } = require('sequelize');

module.exports = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASS,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);