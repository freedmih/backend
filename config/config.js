require("dotenv").config();
module.exports =
{
    "development": {
        "username": process.env.DEV_POSTGRES_USER,
        "password": process.env.DEV_POSTGRES_PASS,
        "database": process.env.DEV_POSTGRES_DB,
        "host": process.env.DEV_POSTGRES_HOST,
        "dialect": "postgres"
    },
    "production": {
        "database": process.env.PROD_POSTGRESS_DB,
        "host": process.env.PROD_POSTGRESS_HOST,
        "dialect": "postgres"
    }
}