const parseTimeToMS = require("./parseTimeToMS");

module.exports = function(){
    const date = new Date();
    return parseTimeToMS(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}