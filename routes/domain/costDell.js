const express = require("express");
const PriceModel = require("../../models/Price");

const router = express.Router({ mergeParams: true });

router.post("/cost_dell", function (req, res) {
    if(!req.body.date) return res.status(400).send("Wrong body");
    PriceModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1, date: req.body.date}, order: [["time", "ASC"]]}).then(async (models) => {
        try{
            for(const model of models){
                await model.destroy();
            }
            res.sendStatus(200);
        } catch(err){
            res.status(500).send("Error on server");
        }
    })
});

module.exports = router;