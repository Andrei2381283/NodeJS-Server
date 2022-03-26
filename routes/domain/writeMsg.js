const express = require("express");
const MessageModel = require("../../models/Message");

const router = express.Router({ mergeParams: true });

router.post("/write_msg", function (req, res) {
    if(!req.body.title || !req.body.message){
        res.status(400).send("Wrong body");
        return;
    }
    MessageModel.create({domain: companies.indexOf(req.params.domain) + 1, from: 1, title: req.body.title, message: req.body.message}).then(model => {
        res.send({id: model.id});
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error on server");
    });
});

module.exports = router;