const Account = require("@models/Account");

const getAccount = async (email, exclude = "") => {
    const account = await Account.findOne({
        email
    }).select("-__v " + exclude).lean();
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
}

const updateAccount = async (email, data) => {
    const account = await Account.findOneAndUpdate({ email }, data, { new: true }).select("-password -__v").lean();
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
}

module.exports = {
    getAccount,
    updateAccount
}