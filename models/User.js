const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const User = sequelize.define("user", {
    login: DataTypes.STRING,
    name: DataTypes.STRING,
    hash: DataTypes.STRING,
    domain: DataTypes.INTEGER,
    perk: {
        type: DataTypes.INTEGER, /* TODO: Make text type */
        defaultValue: 1
    },
    session: DataTypes.UUID,
    sessionExpired: DataTypes.DATE
})

module.exports = User;