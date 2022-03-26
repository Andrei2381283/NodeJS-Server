const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Manager = sequelize.define("manager", {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    hash: DataTypes.STRING,
    domain: DataTypes.INTEGER,
    role: {
        type: DataTypes.INTEGER, /* TODO: make text type */
        defaultValue: 1
    },
    passkey: DataTypes.BIGINT,
    made: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    registered: DataTypes.DATE,
    session: DataTypes.UUID,
    sessionExpired: DataTypes.DATE
})

module.exports = Manager;