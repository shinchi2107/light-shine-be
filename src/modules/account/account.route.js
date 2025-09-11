const express = require("express");
const router = express.Router();
const { getProfileMe, updateAccountProfile, updateAccountPassword, getAccounts, createAccount, findAccountById, updateAccountById } = require("./account.controller");

router.get("/profile", getProfileMe);
router.put("/update", updateAccountProfile);
router.put("/update-password", updateAccountPassword);
router.get("/get-all", getAccounts);
router.post("/create", createAccount);
router.get("/:id", findAccountById);
router.put("/:id", updateAccountById);
module.exports = router;