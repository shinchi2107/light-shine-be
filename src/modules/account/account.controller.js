const { findAccount, updateAccount, getAllAccounts, createAccountService } = require("./account.service");
const { HTTPStatusCode } = require("@constants");
const bcrypt = require("bcryptjs");
const { log } = require("@utils/logger/log");

const getProfileMe = async (req, res) => {
    try {
        const { email } = req.account;
        if (!email) {
            return res.status(HTTPStatusCode.Unauthorized).sendData({ message: "Unauthorized" });
        }
        const account = await findAccount({ email }, "-password");
        res.status(HTTPStatusCode.Ok).sendData({ ...account });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const findAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const account = await findAccount({ _id: id }, "-password");
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
        const account = await updateAccount( { email }, data);
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

        const account = await findAccount({ email }, "");
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
        const updatedAccount = await updateAccount({ email }, { password: hashedPassword });
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

const getAccounts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const accounts = await getAllAccounts({ page: parseInt(page), limit: parseInt(limit), search });
        res.status(HTTPStatusCode.Ok).sendData({ ...accounts });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const createAccount = async (req, res) => {
    try {
        const data = req.body;
        await createAccountService(data);
        res.status(HTTPStatusCode.Created).sendData({ message: "Account created successfully" });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

module.exports = {
    findAccountById,
    getProfileMe,
    updateAccountProfile,
    updateAccountPassword,
    getAccounts,
    createAccount
}