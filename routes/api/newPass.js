const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const OwnerModel = require("../../models/Owner");

const router = express.Router({ mergeParams: true });

router.post("/new_pass", function (req, res) {
    if(!req.body.new_login || !req.body.new_password){
        res.status(400).send("Wrong body");
        return;
    }
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    OwnerModel.findOne({where : {hash: req.hash}}).then((model) => {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        model.setDataValue("login", req.body.new_login);
        model.setDataValue("hash", req.new_hash);
        model.save().then((model2) => {
            res.send({session: sessionCode});
        })
    }).catch((err) => {
        if(!Number.isInteger(err))console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong login or password" : "Error on server");
    });
});

module.exports = router;