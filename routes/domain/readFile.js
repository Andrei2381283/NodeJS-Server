const express = require("express");
const fs = require("fs");

const router = express.Router({ mergeParams: true });

router.post("/read_file", async function (req, res) {
    if(!req.body.name_file){
        res.status(400).send("Wrong body");
        return;
    }
    try{
        res.send(fs.readFileSync(`files/${req.params.domain}/${req.body.name_file}`).toString());
    } catch(err){
        console.log(err);
        res.status(400).send("Wrong file");
    }
});

module.exports = router;