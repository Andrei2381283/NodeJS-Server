const ManagerModel = require("../models/Manager");
const RoleModel = require("../models/Role");

module.exports = async function(req, res, next){
    if(req.method == "GET") return next();
    if(req.model.constructor == ManagerModel && !(await RoleModel.findOne({ where: {id: req.model.role}})).list.includes(req.url.substr(1))){
        return res.status(400).send("You can't access to this command");
    }
    next();
}