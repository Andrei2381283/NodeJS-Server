const express = require("express");
const LogModel = require("../../models/Log");
const dateToCurrentDay = require("../../utils/dateToCurrentDay");

const router = express.Router({ mergeParams: true });

router.post("/list_in", function (req, res) {
    LogModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1, in: dateToCurrentDay()}}).then((models) => {
        res.send(models.filter(model => {
            return model.bill[model.bill.length - 1].type != 'total' && model.bill[model.bill.length - 1].type != 'stop'
        }).map((model) => { return {
            id: model.user
        }}))
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;