const express = require("express");
const OwnerModel = require("../models/Owner");
const UserModel = require("../models/User");
const ManagerModel = require("../models/Manager");
const checkSession = require("../middleware/checkSession");
const checkDomain = require("../middleware/checkDomain");
const hashingLoginPassword = require("../middleware/hashingLoginPassword");
const checkingBody = require("../middleware/checkingBody");
const checkManagerAccess = require("../middleware/checkManagerAccess");
const useMiddlewareForRoutes = require("../utils/useMiddlewareForRoutes");

const router = express.Router();


router.use(checkingBody);

router.use(hashingLoginPassword);

router.use("/", [
    require("./api/newOwner"),
    require("./api/recoveryOwner"),
    require("./api/newPass"),
    require("./api/inOwner"),

    useMiddlewareForRoutes(checkSession(OwnerModel),[
        require("./api/checkDomain"),
        require("./api/takeDomain"),
        require("./api/listDomain")
    ])
])


router.use("/:domain/", [
    checkDomain,
    require("./domain/filesGet"),

    require("./domain/newUser"),
    require("./domain/inUser"),
    require("./domain/recoveryUser"),
    require("./domain/out"),

    require("./domain/newStaff"),
    require("./domain/recoveryStaff"),
    require("./domain/inStaff"),
    require("./domain/newPassStaff"),

    useMiddlewareForRoutes(checkSession(UserModel), [
        require("./domain/read"),
        require("./domain/check"),
        require("./domain/bill")
    ]),

    useMiddlewareForRoutes(checkSession(OwnerModel), [
        require("./domain/newPasskey")
    ]),

    useMiddlewareForRoutes([checkSession(ManagerModel, OwnerModel), checkManagerAccess], [
        require("./domain/readStaff"),
        require("./domain/ok"),
        require("./domain/noOk"),
        require("./domain/perk"),
        require("./domain/balance"),
        require("./domain/readMsgs"),
        require("./domain/writeMsg"),
        require("./domain/costRead"),
        require("./domain/costDell"),
        require("./domain/costAdd"),
        require("./domain/staffListRead"),
        require("./domain/staffDell"),
        require("./domain/staffDellAll"),
        require("./domain/userListRead"),
        require("./domain/roleListRead"),
        require("./domain/roleWrite"),
        require("./domain/settingsCalcEdit"),
        require("./domain/settingsCalcRead"),
        require("./domain/readFile"),
        require("./domain/writeFile"),
        require("./domain/listIn"),
        require("./domain/logRead")
    ])
])

module.exports = router;