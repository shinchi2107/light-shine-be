const express = require("express");
const router = express.Router();
const { getProfileMe, updateAccountProfile, updateAccountPassword, getAccounts, createAccount } = require("./account.controller");

router.get("/profile", getProfileMe);
router.put("/update", updateAccountProfile);
router.put("/update-password", updateAccountPassword);
router.get("/get-all", getAccounts);
router.post("/create", createAccount);
module.exports = router;