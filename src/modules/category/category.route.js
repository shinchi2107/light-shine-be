const express = require("express");
const router = express.Router();
const { getCategories, createCategory, updateCategoryById, findCategoryById } = require("./category.controller");



router.get("/get-all", getCategories);
router.post("/create", createCategory);
router.get("/:id", findCategoryById);
router.put("/:id", updateCategoryById);
module.exports = router;