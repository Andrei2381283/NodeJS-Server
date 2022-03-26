const express = require("express");
const DomainModel = require("../../models/Domain");

const router = express.Router({ mergeParams: true });

router.post("/settings_calc_read", function (req, res) {
    DomainModel.findOne({where: {domain: req.params.domain}}).then((model) => {
        if(!model) throw 400;
        const {rounding,unit_time,cost_in,min_cost,vat,currency} = model;
        res.send({rounding,unit_time,cost_in,min_cost,vat,currency});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;