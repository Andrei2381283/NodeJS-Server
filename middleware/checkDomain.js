module.exports = function checkDomain(req, res, next){
    if(req.method == "GET") return next();
    if(companies.includes(req.params.domain)) next();
    else res.status(404).send("Wrong domain");
}