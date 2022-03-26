const express = require("express");

const router = express.Router({ mergeParams: true });

router.post("/list_domain", async function (req, res) {
    const model = req.model;
    res.send(model.domains.map(v => companies[v - 1]));
});

module.exports = router;