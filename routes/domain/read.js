const express = require("express");
const UserRequestModel = require("../../models/UserRequest");

const router = express.Router({ mergeParams: true });

router.post("/read", function (req, res) {
    UserRequestModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, key: req.model.getDataValue("id")}, order: [["id", "DESC"]]}).then((requestModel) => {
        res.send(["wait", "again", requestModel.type][requestModel.status - 1]);
    })
});

module.exports = router;