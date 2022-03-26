const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Perk = sequelize.define("perk", {
    domain: DataTypes.INTEGER,
    perk: DataTypes.STRING
})

module.exports = Perk;