const { DataTypes } = require('sequelize');
const sequelize = require("./../sequelize");

const Owner = sequelize.define("owner", {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    hash: DataTypes.STRING,
    domains: {
        type: DataTypes.TEXT,
        get() {
            return JSON.parse(this.getDataValue('domains'))
        },
        set(val) {
           this.setDataValue('domains',JSON.stringify(val));
        },
        validate: {
            checkLength(value) {
                if (JSON.parse(value).length > this.maxDomains) {
                    throw new Error("Domains > " + this.maxDomains);
                }
            }
        },
        defaultValue: "[]"
    },
    session: DataTypes.UUID,
    sessionExpired: DataTypes.DATE
})

module.exports = Owner;