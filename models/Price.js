const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Price = sequelize.define("price", {
    domain: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time: DataTypes.DATE,
    perk: DataTypes.INTEGER,
    cost: DataTypes.FLOAT
})

module.exports = Price;