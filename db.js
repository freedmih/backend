const { Sequelize, DataTypes } = require('sequelize');


module.exports = new Sequelize(
    process.env.DEV_POSTGRES_DB,
    process.env.DEV_POSTGRES_USER,
    process.env.DEV_POSTGRES_PASS,
    {
        host: process.env.DEV_POSTGRES_HOST,
        dialect: 'postgres'
    }
);