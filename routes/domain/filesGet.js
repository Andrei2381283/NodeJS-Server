const express = require("express");
const fs = require("fs");

const router = express.Router({ mergeParams: true });

router.get(/|\/.+/i, function (req, res, next) {
    if(!companies.includes(req.params.domain)) return next();
    const path = req.path == "/" ? "/index.html" : req.path;
    const finalPath = dir + (path.split("/")[1] == "staff" || path.split("/")[1] == "user" ? "/site" + path : "/" + req.params.domain + path);
    console.log("Domain get req: ", finalPath);
    try {
        if(!fs.existsSync(finalPath)) throw 404;
        res.sendFile(finalPath);
    } catch(err){
        res.status(404);
        res.sendFile(dir + "/site/404.html");
    }
});

module.exports = router;