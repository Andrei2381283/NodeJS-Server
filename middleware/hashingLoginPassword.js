const crypto = require("crypto");

module.exports = function(req, res, next){
    if(req.method == "GET" || !req.body || !req.body.login || !req.body.password) return next();
    req.hash = crypto.pbkdf2Sync(req.body.login + ":" + req.body.password.toString(), "asdasdasd", 1051, 64, `sha512`).toString(`hex`);
    if(req.body.new_login && req.body.new_password) req.new_hash = crypto.pbkdf2Sync(req.body.new_login + ":" + req.body.new_password.toString(), "asdasdasd", 1051, 64, `sha512`).toString(`hex`);
    next();
}