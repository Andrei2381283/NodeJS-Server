const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const UserModel = require("../../models/User");
const UserRequestModel = require("../../models/UserRequest");
const getRandomColor = require("../../utils/getRandomColor");
const generateCode = require("../../utils/generateCode");

const router = express.Router({ mergeParams: true });

router.post("/recovery", function (req, res) {
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    UserModel.findOne({where : {hash: req.hash}}).then(function(model) {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        model.save().then((model2) => {
            const color = getRandomColor();
            const code = generateCode();
            UserRequestModel.create({domain: companies.indexOf(req.params.domain) + 1, type: "in", key: model.getDataValue("id"), color: color[0], colorName: color[1], code: code}).then((requestModel) => {
                res.send({session: sessionCode, color: color[0], colorName: color[1], code: code});
            })
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong login or password" : "Error on server");
    });
});

module.exports = router;