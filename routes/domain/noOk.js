const express = require("express");
const UserRequestModel = require("../../models/UserRequest");
const UserModel = require("../../models/User");

const router = express.Router({ mergeParams: true });

router.post("/no_ok", function (req, res) {
    UserRequestModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, id: req.body.id}}).then(async (model) => {
        if(!model) throw 400;
        model.setDataValue("status", 2);
        await model.save();
        const user = await UserModel.findOne({where: {id: model.key}});
        if(!user) throw 500;
        res.send({user: user.id});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(err == 400 ? "Wrong id" : "Error on server");
    })
});

module.exports = router;