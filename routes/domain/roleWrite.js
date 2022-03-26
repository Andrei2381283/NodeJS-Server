const express = require("express");
const RoleModel = require("../../models/Role");

const router = express.Router({ mergeParams: true });

router.post("/role_write", function (req, res) {
    if(!req.body.title || !Array.isArray(req.body.rights)) return res.status(400).send("Wrong body");
    RoleModel.findOne({where: {name: req.body.title}}).then(async (model) => {
        if(!model) model = await RoleModel.create({domain: companies.indexOf(req.params.domain) + 1, name: req.body.title, list: JSON.stringify(req.body.rights)});
        else if(model && !req.body.rights.length) await model.destroy();
        else if(model) {
            model.list = req.body.rights;
            await model.save();
        }
        res.send({title: req.body.title});
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;