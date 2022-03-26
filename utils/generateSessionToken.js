const crypto = require('crypto');

module.exports = function(){
    return crypto.randomBytes(27).toString('base64');
}