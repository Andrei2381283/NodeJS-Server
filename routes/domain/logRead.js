const express = require("express");
const LogModel = require("../../models/Log");
const dateToCurrentDay = require("../../utils/dateToCurrentDay");

const router = express.Router({ mergeParams: true });

router.post("/log_read", function (req, res) {
    LogModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1, in: dateToCurrentDay(req.body.date)}}).then((models) => {
        res.send(models.map((model) => { return {
            user: model.user,
            employee: model.employee,
            total: model.total,
            bill: model.bill
        }}))
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;