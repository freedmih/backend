const { DataTypes, Sequelize } = require('sequelize');
const db = require("./../db");

const Task = db.define('Task', {
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false
    }
});

module.exports.Task = Task;