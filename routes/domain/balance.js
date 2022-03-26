const express = require("express");
const DomainModel = require("../../models/Domain");

const router = express.Router({ mergeParams: true });

router.post("/ok", function (req, res) {
    DomainModel.findOne({where: {domain: req.params.domain}}).then(async (model) => {
        const {count, balance_old, cost, limit} = model;
        res.send({count, balance_old, cost, limit});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;