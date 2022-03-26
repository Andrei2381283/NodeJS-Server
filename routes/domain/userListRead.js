const express = require("express");
const { Op } = require('sequelize');
const UserModel = require("../../models/User");

const router = express.Router({ mergeParams: true });

router.post("/user_list_read", function (req, res) {
    if(!(req.body.key = Number(req.body.key)) || !(req.body.count = Number(req.body.count))) return res.status(400).send("Wrong body");
    UserModel.findAll({where: {id: {[Op.between]: [req.body.key, req.body.key + req.body.count - 1]}}, order: [["id", "ASC"]]}).then((models) => {
        res.send(models.map(v => [v.id, v.hash, v.updatedAt && v.updatedAt.toLocaleDateString("default", {day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}), v.perk, v.name]));
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;