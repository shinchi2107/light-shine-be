const jwt = require("jsonwebtoken");
const { HTTPStatusCode } = require("@constants");
const { log } = require("@utils/logger/log");

const authMiddleware = (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
    try {
        const token = accessToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "access_token_secret");
        req.account = decoded;
        next();
    } catch (error) {
        log(error)
        return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
    }
}

module.exports = authMiddleware;