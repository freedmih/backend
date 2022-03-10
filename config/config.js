require("dotenv").config();
module.exports =
{
    "development": {
        "username": process.env.DEV_POSTGRES_USER,
        "password": process.env.DEV_POSTGRES_PASS,
        "database": process.env.DEV_POSTGRES_DB,
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "database": "sequelize_todo_production",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}