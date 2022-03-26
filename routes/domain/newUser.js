const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const UserModel = require("../../models/User");
const UserRequestModel = require("../../models/UserRequest");
const getRandomColor = require("../../utils/getRandomColor");
const generateCode = require("../../utils/generateCode");

const router = express.Router({ mergeParams: true });

router.post("/new_user", async function (req, res) {
    if(!req.body.login || !req.body.name || !req.body.password){
        res.status(400).send("Wrong body");
        return;
    }
    try{
        const UserWithThisLogin = await UserModel.findOne({where:{login: req.body.login}});
        if(UserWithThisLogin){
            return res.send("User with this login already registered");
        }
    } catch(err){
        console.log(err);
    }
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    UserModel.create({ name: req.body.name, login: req.body.login, hash: req.hash, domain: companies.indexOf(req.params.domain) + 1, session: sessionCode, sessionExpired: expiredDate}).then((model) => {
        console.log("UserModel created: ", { name: req.body.name, login: req.body.login, hash: req.hash, domain: companies.indexOf(req.params.domain) + 1, session: sessionCode, sessionExpired: expiredDate});
        const color = getRandomColor();
        const code = generateCode();
        UserRequestModel.create({domain: companies.indexOf(req.params.domain) + 1, type: "in", key: model.getDataValue("id"), color: color[0], colorName: color[1], code: code}).then((requestModel) => {
            res.send({session: sessionCode, color: color[0], colorName: color[1], code: code});
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error on server");
    });
});

module.exports = router;