const express = require("express");
const fs = require("fs");

const router = express.Router({ mergeParams: true });

router.post("/write_file", async function (req, res) {
    if(!req.body.name_file || !req.body.txt_file){
        res.status(400).send("Wrong body");
        return;
    }
    try{
        fs.writeFileSync(`files/${req.params.domain}/${req.body.name_file}`, req.body.txt_file);
        res.send({name_file: req.body.name_file});
    } catch(err){
        console.log(err);
        res.status(400).send("Wrong file");
    }
});

module.exports = router;