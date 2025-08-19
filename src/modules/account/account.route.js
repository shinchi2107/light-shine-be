const express = require("express");
const router = express.Router();
const { getProfileMe, updateAccountProfile, updateAccountPassword } = require("./account.controller");

router.get("/profile", getProfileMe);
router.put("/update", updateAccountProfile);
router.put("/update-password", updateAccountPassword);

module.exports = router;