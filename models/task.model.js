const { DataTypes } = require('sequelize');
const db = require("./../db");

const Task = db.define('Task', {
    uuid: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true
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