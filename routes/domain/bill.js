const express = require("express");
const LogModel = require("../../models/Log");
const PerkModel = require("../../models/Perk");
const PriceModel = require("../../models/Price");
const DomainModel = require("../../models/Domain");
const dateToCurrentDay = require("../../utils/dateToCurrentDay");
const calcBill = require("../../utils/calcBill");

const router = express.Router({ mergeParams: true });

router.post("/bill", function (req, res) {
    LogModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, user: req.model.id, in: dateToCurrentDay()}}).then(async (model) => {
        if(!model) return res.send([]);
        const perk = await PerkModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, id: req.model.perk}});
        var startIndex = 0;
        model.bill.forEach((value, index) => value.type == "start" && (startIndex = index));
        if(model.bill[model.bill.length - 1].type == "stop" || model.bill[model.bill.length - 1].type == "total") return res.send({perk: perk?.perk || null, bill: model.bill.slice(startIndex)});
        const domainModel = await DomainModel.findOne({ where: {domain: req.params.domain} });
        const priceModels = await PriceModel.findAll({ where: {domain: domainModel.id, date: dateToCurrentDay(), perk: perk?.id || null} });
        if(!priceModels.length){
            const defaulPriceModel = await PriceModel.findOne({ where: {domain: domainModel.id, date: new Date(2020, 1, 1, 0, 0, 0, 0), perk: perk?.id || null} });
            if(defaulPriceModel) priceModels.push(defaulPriceModel);
        }
        if(!priceModels.length) return res.send({perk: perk?.perk || null, bill: model.bill.slice(startIndex)});
        const calculatedBill = calcBill(priceModels, domainModel);
        const endBill = model.bill.concat(calculatedBill.slice((model.bill.length - 1) - startIndex)).slice(startIndex);
        endBill.push({type:'total', data:[endBill.reduce((prevValue, curValue) => prevValue + Number(curValue.data[curValue.data.length - 1])), domainModel.currency]});
        res.send({perk: perk?.perk || null, bill: endBill});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;