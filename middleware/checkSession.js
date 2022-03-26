const OwnerModel = require("../models/Owner");

module.exports = function checkSession(){
    const args = [...arguments];
    return async function(req,res,next){
        /* if(req.path.split("/").length > 2) return next(); */
        if(req.method == "GET") return next();
        if(req.body.session){
            try{
                for(const _model of args){
                    const model = await _model.findOne({where : {session: req.body.session}});
                    if(!model || (model.constructor == OwnerModel && req.params.domain && companiesData[companies.indexOf(req.params.domain)].owner != model.id)) continue;
                    if(model.sessionExpired && Date.now() > (new Date(model.sessionExpired)).getTime()) throw 401;
                    req.model = model;
                    return next();
                }
                throw 400;
            } catch(err){
                if(!Number.isInteger(err))console.log(err);
                res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong domain, session or session expired" : "Error on server");
            }
        } else {
            res.status(400).send("Session code not passed");
        }
    }
}