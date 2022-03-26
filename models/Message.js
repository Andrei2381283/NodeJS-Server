const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Message = sequelize.define("message", {
    domain: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING
})

module.exports = Message;