const express = require("express");
const MessageModel = require("../../models/Message");

const router = express.Router({ mergeParams: true });

router.post("/read_msgs", function (req, res) {
    MessageModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1}, order: [["id", "ASC"]]}).then((models) => {
        res.send(models.slice(Number(req.body.from) || 0).map(v => [v.from, v.title, v.message]));
    })
});

module.exports = router;