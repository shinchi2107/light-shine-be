const { registerAccount, loginAccount, logoutAccount, refreshTokenAccount } = require("./auth.service");
const { HTTPStatusCode } = require("@constants");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await registerAccount({ name, email, password });
        res.status(HTTPStatusCode.Created).sendData({ ...data });
    } catch (error) {
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginAccount({ email, password });
        res.status(HTTPStatusCode.Ok).sendData({ ...data });
    } catch (err) {
        console.log(err)
        res.status(HTTPStatusCode.Unauthorized).sendData({ error: err.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ error: "No token provided" });
        const data = await refreshTokenAccount(token);
        res.status(HTTPStatusCode.Ok).sendData({ ...data });
    } catch (err) {
        res.status(HTTPStatusCode.Forbidden).sendData({ error: err.message });
    }
}

const logout = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(HTTPStatusCode.BadRequest).sendData({ error: "No token provided" });
        const result = await logoutAccount(token);
        res.status(HTTPStatusCode.Ok).sendData({ ...result });
    } catch (err) {
        res.status(HTTPStatusCode.BadRequest).sendData({ error: err.message });
    }
}

module.exports = { register, login, refreshToken, logout };