const express = require("express");
const ManagerModel = require("../../models/Manager");

const router = express.Router({ mergeParams: true });

router.post("/staff_dell", function (req, res) {
    if(!req.body.key) return res.status(400).send("Wrong body");
    ManagerModel.findOne({where: {id: req.body.key}, order: [["id", "ASC"]]}).then(async (model) => {
        if(!model) throw 400;
        await model.destroy();
        res.sendStatus(200);
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong key" : "Error on server");
    })
});

module.exports = router;