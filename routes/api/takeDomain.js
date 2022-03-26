const express = require("express");
const DomainModel = require("../../models/Domain");
const fs = require("fs");

const router = express.Router({ mergeParams: true });

router.post("/take_domain", async function (req, res) {
    if(!req.body.domain || !req.body.company_name){
        res.status(400).send("Wrong body");
        return;
    }
    const domain = req.body.domain;
    const company_name = req.body.company_name;
    const model = req.model;
    const userId = model.getDataValue("id");
    if(companies.includes(domain)) return res.send([userId, "occupied"]);
    if(model.domains.length >= 5) return res.send([userId, "max domains"]);
    DomainModel.create({ domain: domain, company_name: company_name, owner: userId}).then((domainModel) => {
        console.log("DomainModel created: ", { domain: domain, company_name: company_name, owner: userId});
        model.domains = model.domains.concat([domainModel.getDataValue("id")]);
        model.save().then(() => {
            fs.mkdirSync("files/" + domain);
            fs.writeFileSync("files/" + domain + "/settings.json", "{}");
            res.send({status: "free"});
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;