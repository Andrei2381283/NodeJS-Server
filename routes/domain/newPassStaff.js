const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const ManagerModel = require("../../models/Manager");

const router = express.Router({ mergeParams: true });

router.post("/new_pass_staff", function (req, res) {
    if(!req.body.new_login || !req.body.new_password){
        res.status(400).send("Wrong body");
        return;
    }
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    ManagerModel.findOne({where : {hash: req.hash}}).then(async (model) => {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        model.setDataValue("login", req.body.new_login);
        model.setDataValue("hash", req.new_hash);
        await model.save();
        res.send({session: sessionCode});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong login or password" : "Error on server");
    });
});

module.exports = router;