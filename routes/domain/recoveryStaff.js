const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const ManagerModel = require("../../models/Manager");

const router = express.Router({ mergeParams: true });

router.post("/recovery_staff", function (req, res) {
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    ManagerModel.findOne({where : {hash: req.hash}}).then(async (model) => {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        await model.save();
        res.send({session: sessionCode, role: model.getDataValue("role")}); /* TODO: make role text type */
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong login or password" : "Error on server");
    });
});

module.exports = router;