const express = require("express");
const UserModel = require("../../models/User");
const PerkModel = require("../../models/Perk");

const router = express.Router({ mergeParams: true });

router.post("/perk", function (req, res) {
    if(!req.body.id || !req.body.perk) return res.status(400).send("Wrong body");
    UserModel.findOne({where: {id: req.body.id}}).then(async (model) => {
        if(!model) throw 400;
        var perkModel = await PerkModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, perk: req.body.perk}});
        if(!perkModel) perkModel = await PerkModel.create({domain: companies.indexOf(req.params.domain) + 1, perk: req.body.perk});
        const perkId = perkModel.id;
        model.setDataValue("perk", perkId);
        await model.save();
        res.send({id: model.id, perk: model.perk, name: model.name});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(err == 400 ? "Wrong id or perk" : "Error on server");
    })
});

module.exports = router;