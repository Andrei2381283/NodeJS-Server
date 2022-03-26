const express = require("express");
const UserModel = require("../../models/User");

const router = express.Router({ mergeParams: true });

router.post("/user_dell_all", function (req, res) {
    UserModel.findAll().then(async (models) => {
        for(const model of models){
            await model.destroy();
        }
        res.sendStatus(200);
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(Number.isInteger(err) ? "Wrong key" : "Error on server");
    })
});

module.exports = router;