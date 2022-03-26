const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const OwnerModel = require("../../models/Owner");

const router = express.Router({ mergeParams: true });

router.post("/in_owner", async function (req, res) {
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    OwnerModel.findOne({where : {session: req.body.session}}).then(function(model) {
        if(!model) throw 400;
        model.setDataValue("session", sessionCode);
        model.setDataValue("sessionExpired", expiredDate);
        model.save().then((model2) => {
            res.send({session: sessionCode});
        })
    }).catch((err) => {
        if(!Number.isInteger(err))console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong session" : "Error on server");
    });
});

module.exports = router;