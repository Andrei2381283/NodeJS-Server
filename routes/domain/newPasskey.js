const express = require("express");
const generatePasskey = require("../../utils/generatePasskey");
const ManagerModel = require("../../models/Manager");
const RoleModel = require("../../models/Role");

const router = express.Router({ mergeParams: true });

router.post("/new_passkey", function (req, res) {
    if(!req.body.role) return res.status(400).send("Role not passed");
    const passkey = generatePasskey();
    RoleModel.findOne({where: {domain: companies.indexOf(req.params.domain) + 1, name: req.body.role}}).then(async (roleModel) => {
        if (!roleModel) roleModel = await RoleModel.create({ name: req.body.role, domain: companies.indexOf(req.params.domain) + 1 });
        const roleId = roleModel.id;
        await ManagerModel.create({ passkey: passkey, name: req.body.name || null, role: roleId, domain: companies.indexOf(req.params.domain) + 1 })
        console.log("ManagerModel created: ", { passkey: passkey, name: req.body.name || null, role: roleId, domain: companies.indexOf(req.params.domain) + 1 });
        res.send({passkey, name: req.body.name || null, role: roleId});
    }).catch((err) => {
        console.log(err);
        res.status( Number.isInteger(err) ? err : 500).send(err == 400 ? "Wrong role" : "Error on server");
    });
});

module.exports = router;