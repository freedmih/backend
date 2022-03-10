require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');


module.exports = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASS,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);