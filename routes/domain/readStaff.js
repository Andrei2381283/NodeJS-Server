const express = require("express");
const UserRequestModel = require("../../models/UserRequest");

const router = express.Router({ mergeParams: true });

router.post("/read_staff", function (req, res) {
    UserRequestModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1, status: 1}, order: [["id", "ASC"]]}).then((models) => {
        res.send(models.map(v => [v.id, v.type, v.color, v.colorName, v.code]));
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;