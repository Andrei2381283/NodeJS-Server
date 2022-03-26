const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const UserRequest = sequelize.define("userRequest", {
    type: DataTypes.STRING,
    key: DataTypes.INTEGER,
    color: DataTypes.STRING,
    colorName: DataTypes.STRING,
    code: DataTypes.STRING,
    domain: DataTypes.INTEGER,
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
})

module.exports = UserRequest;