const { registerAccount, loginAccount, logoutAccount, refreshTokenAccount } = require("./auth.service");
const { HTTPStatusCode } = require("@constants");
const { log } = require("@utils/logger/log");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await registerAccount({ name, email, password });
        res.status(HTTPStatusCode.Created).sendData({ ...data });
    } catch (error) {
        log(error)
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginAccount({ email, password });
        res.status(HTTPStatusCode.Ok).sendData({ ...data });
    } catch (error) {
        log(error)
        res.status(HTTPStatusCode.Unauthorized).sendData({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "No token provided" });
        const data = await refreshTokenAccount(token);
        res.status(HTTPStatusCode.Ok).sendData({ ...data });
    } catch (error) {
        log(error)
        res.status(HTTPStatusCode.Forbidden).sendData({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(HTTPStatusCode.BadRequest).sendData({ message: "No token provided" });
        const result = await logoutAccount(refreshToken);
        res.status(HTTPStatusCode.Ok).sendData({ ...result });
    } catch (error) {
        log(error)
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

module.exports = { register, login, refreshToken, logout };