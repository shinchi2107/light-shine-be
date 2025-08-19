const { Router } = require("express");
const { register, login, refreshToken, logout } = require("./auth.controller");
const authMiddleware = require("@middlewares/authMiddleware");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authMiddleware, logout);

module.exports = router;