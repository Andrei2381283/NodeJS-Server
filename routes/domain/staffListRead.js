const express = require("express");
const ManagerModel = require("../../models/Manager");

const router = express.Router({ mergeParams: true });

router.post("/staff_list_read", function (req, res) {
    if(isNaN(req.body.key = Number(req.body.key)) || isNaN(req.body.count = Number(req.body.count))) return res.status(400).send("Wrong body");
    ManagerModel.findAll({ where: { domain: companies.indexOf(req.params.domain) + 1 }, limit: req.body.count, offset: req.body.key, order: [["id", "ASC"]]}).then((models) => {
        res.send(models.map(v => [v.id, v.hash, v.updatedAt && v.updatedAt.toLocaleDateString("default", {day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}), v.name, v.passkey, v.createdAt && v.createdAt.toLocaleDateString("default", {day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"})]));
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;