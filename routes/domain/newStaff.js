const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const ManagerModel = require("../../models/Manager");

const router = express.Router({ mergeParams: true });

router.post("/new_staff", async function (req, res) {
    if(!req.body.name || !req.hash || !req.body.passkey){
        res.status(400).send("Wrong body");
        return;
    }
    try{
        const ManagerWithThisLogin = await ManagerModel.findOne({where:{login: req.body.login}});
        if(ManagerWithThisLogin){
            res.status(400).send("User with this login already registered");
        }
    } catch(err){
        console.log(err);
    }
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    ManagerModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, passkey: req.body.passkey}}).then(async (model) => {
        if(!model) throw 400;
        if(model.hash) throw 400;
        model.setDataValue("name", req.body.name);
        model.setDataValue("login", req.body.login);
        model.setDataValue("hash", req.hash);
        model.setDataValue("registered", nowDate);
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        await model.save();
        res.send({session: sessionCode, role: model.getDataValue("role")}) /* TODO: make role text type */
        console.log("ManagerModel updated: ", model);
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong passkey or passkey expired" : "Error on server");
    });
});

module.exports = router;