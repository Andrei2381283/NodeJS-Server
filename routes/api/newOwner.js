const express = require("express");
const generateSession = require("../../utils/generateSessionToken");
const OwnerModel = require("../../models/Owner");

const router = express.Router({ mergeParams: true });

router.post("/new_owner", async function (req, res) {
    if(!req.body.login || !req.body.name || !req.body.password){
        res.status(400).send("Wrong body");
        return;
    }
    try{
        const OwnerWithThisLogin = await OwnerModel.findOne({where:{login: req.body.login}});
        if(OwnerWithThisLogin){
            res.status(400);
            return res.send("User with this login already registered");
        }
    } catch(err){
        console.log(err);
    }
    const sessionCode = generateSession();
    const nowDate = new Date();
    const expiredDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0, 0);
    OwnerModel.create({ name: req.body.name, login: req.body.login, hash: req.hash, session: sessionCode, sessionExpired: expiredDate}).then((model) => {
        console.log("OwnerModel created: ", { name: req.body.name, login: req.body.login, hash: req.hash, session: sessionCode, sessionExpired: expiredDate});
        res.send({session: sessionCode});
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;