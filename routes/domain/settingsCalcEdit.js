const express = require("express");
const DomainModel = require("../../models/Domain");

const router = express.Router({ mergeParams: true });

router.post("/settings_calc_edit", function (req, res) {
    DomainModel.findOne({where: {domain: req.params.domain}}).then(async (model) => {
        if(!model) throw 400;
        for(const param of ["rounding","unit_time","cost_in","min_cost","vat","currency"]){
            if(req.body[param]) model[param] = req.body[param];
        }
        const {rounding,unit_time,cost_in,min_cost,vat,currency} = model;
        await model.save();
        res.send({rounding,unit_time,cost_in,min_cost,vat,currency});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;