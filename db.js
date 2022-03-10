require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');


module.exports = process.env.NODE_ENV == "production" ? new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
) :
new Sequelize(
    process.env.DEV_POSTGRES_DB,
    process.env.DEV_POSTGRES_USER,
    process.env.DEV_POSTGRES_PASS,
    {
        host: process.env.DEV_POSTGRES_HOST,
        dialect: 'postgres',
    }
);