const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Domain = sequelize.define("domain", {
    domain: DataTypes.STRING,
    company_name: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    balance_old: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    base_cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    limit: {
        type: DataTypes.INTEGER,
        defaultValue: -500
    },
    rounding: {
        type: DataTypes.FLOAT,
        defaultValue: 1
    },
    unit_time: {
        type: DataTypes.STRING,
        defaultValue: "min"
    },
    cost_in: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    min_cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    vat: {
        type: DataTypes.INTEGER,
        defaultValue: 20
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: "руб"
    }
})

module.exports = Domain;