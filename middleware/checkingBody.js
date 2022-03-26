module.exports = function(req, res, next){
    if(req.method == "GET") return next();
    if(typeof req.body != "object") return res.status(400).send("Wrong body");
    next();
}