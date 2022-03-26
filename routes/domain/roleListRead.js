const express = require("express");
const RoleModel = require("../../models/Role");

const router = express.Router({ mergeParams: true });

router.post("/role_list_read", function (req, res) {
    RoleModel.findAll({where: {domain: companies.indexOf(req.params.domain) + 1}}).then((models) => {
        res.send(models.map(v => {
            return {name: v.name, list: v.list}
        }));
    }).catch((err) => {
        if(!Number.isInteger(err)) console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send("Error on server");
    })
});

module.exports = router;