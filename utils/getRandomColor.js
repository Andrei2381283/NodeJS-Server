const colors = require("../types/colors.json");
const randomInt = require("./randomInt");

module.exports = function(){
    return colors[randomInt(0, colors.length - 1)];
}