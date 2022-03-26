const express = require("express");
const UserRequestModel = require("../../models/UserRequest");
const getRandomColor = require("../../utils/getRandomColor");
const generateCode = require("../../utils/generateCode");

const router = express.Router({ mergeParams: true });

router.post("/check", function (req, res) {
    const model = req.model;
    model.setDataValue("time", new Date());
    model.save().then((model2) => {
        const color = getRandomColor();
        const code = generateCode();
        UserRequestModel.create({domain: companies.indexOf(req.params.domain) + 1, type: "check", key: model.getDataValue("id"), color: color[0], colorName: color[1], code: code}).then((requestModel) => {
            res.send({color: color[0], colorName: color[1], code: code});
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;