const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const UserModel = require("../../models/User");
const UserRequestModel = require("../../models/UserRequest");
const LogModel = require("../../models/Log");
const getRandomColor = require("../../utils/getRandomColor");
const generateCode = require("../../utils/generateCode");
const dateToCurrentDay = require("../../utils/dateToCurrentDay");
const getCurrentTime = require("../../utils/getCurrentTime")
const DomainModel = require("../../models/Domain");

const router = express.Router({ mergeParams: true });

router.post("/in_user", function (req, res) {
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    UserModel.findOne({where : {domain: companies.indexOf(req.params.domain) + 1, session: req.body.session}}).then(async function(model) {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        await model.save();
        const color = getRandomColor();
        const code = generateCode();
        await UserRequestModel.create({domain: companies.indexOf(req.params.domain) + 1, type: "in", key: model.getDataValue("id"), color: color[0], colorName: color[1], code: code});
        const domain = await DomainModel.findOne({where: {domain: req.params.domain}});
        const logModel = (await LogModel.findOrCreate({where: {domain: companies.indexOf(req.params.domain) + 1, user: model.id, in: dateToCurrentDay()}}))[0];
        logModel.bill = logModel.bill.concat({type:'start', data:[getCurrentTime(), getCurrentTime(), domain.cost_in, domain.cost_in]});
        await logModel.save()
        res.send({session: sessionCode, color: color[0], colorName: color[1], code: code});
    }).catch((err) => {
        if(!Number.isInteger(err))console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong session" : "Error on server");
    });
});

module.exports = router;