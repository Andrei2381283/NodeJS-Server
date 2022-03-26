const express = require("express");

const router = express.Router({ mergeParams: true });

router.post("/check_domain", async function (req, res) {
    if(!req.body.domain){
        res.sendStatus(400);
        return;
    }
    const domain = req.body.domain;
    const model = req.model;
    res.send({status: !companies.includes(domain) ? "free" : "occupied"});
});

module.exports = router;