const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Log = sequelize.define("log", {
    domain: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    employee: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    in: DataTypes.DATE,
    bill: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('bill'))
        },
        set(val) {
           this.setDataValue('bill',JSON.stringify(val));
        },
        defaultValue: "[]"
    }
})

module.exports = Log;