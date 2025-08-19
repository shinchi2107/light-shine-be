const { getAccount, updateAccount } = require("./account.service");
const { HTTPStatusCode } = require("@constants");
const bcrypt = require("bcryptjs");
const { log } = require("@utils/logger/log");

const getProfileMe = async (req, res) => {
    try {
        const { email } = req.account;
        if (!email) {
            return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
        }
        const account = await getAccount(email, "-password");
        res.status(HTTPStatusCode.Ok).sendData({ ...account });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const updateAccountProfile = async (req, res) => {
    try {
        const { email } = req.account;
        const data = req.body;
        if (!email) {
            return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
        }
        const account = await updateAccount(email, data);
        if (!account) {
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: "Account not found" });
        }
        res.status(HTTPStatusCode.Ok).sendData({ message: "Updated successfully" });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const updateAccountPassword = async (req, res) => {
    try {
        const { email } = req.account;
        const data = req.body;
        if (!email) {
            return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
        }

        const account = await getAccount(email, "");
        if (!account) {
            log("Account not found");
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: "Not found" });
        }
        const isMatch = await bcrypt.compare(data.password, account.password);
        if (!isMatch) {
            log("Password is incorrect");
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: "Password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        const updatedAccount = await updateAccount(email, { password: hashedPassword });
        if (!updatedAccount) {
            log("Failed to update password");
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: "Failed to update" });
        }
        res.status(HTTPStatusCode.Ok).sendData({ message: "Updated successfully" });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

module.exports = {
    getProfileMe,
    updateAccountProfile,
    updateAccountPassword
}