const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Role = sequelize.define("role", {
    domain: DataTypes.INTEGER,
    name: DataTypes.STRING,
    list: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('list'))
        },
        set(val) {
           this.setDataValue('list',JSON.stringify(val));
        },
        defaultValue: "[]"
    }
})

module.exports = Role;