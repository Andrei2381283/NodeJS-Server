const express = require("express");
const PriceModel = require("../../models/Price");

const router = express.Router({ mergeParams: true });

router.post("/cost_add", async function (req, res) {
    if(!req.body.date || !Array.isArray(req.body.times) || !req.body.times.length) return res.status(400).send("Wrong body");
    try{
        const splitedDate = req.body.date.split(".").map(v => Number(v));
        for(const time of req.body.times){
            const splitedTime = time.time.split(":").map(v => Number(v));
            const date = new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0], splitedTime[0], splitedTime[1], 0, 0);
            await PriceModel.create({domain: companies.indexOf(req.params.domain) + 1, date: req.body.date, time: date, perk: time.perk, cost: time.cost});
        }
        res.sendStatus(200);
    } catch(err){
        res.status(500).send("Error on server");
    }
});

module.exports = router;