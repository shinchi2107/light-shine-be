const Account = require("@models/Account");
const bcrypt = require("bcryptjs");

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

const getAllAccounts = async ({ page = 1, limit = 10, search = "" }) => {
    const skip = (page - 1) * limit;

    // create query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // "i" = case insensitive
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const [accounts, total] = await Promise.all([
        Account.find(query).select("-password -__v").skip(skip).limit(limit),
        Account.countDocuments(query)
    ]).catch(err => {
        throw new Error(err);
    });

    return {
        accounts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: page < Math.ceil(total / limit)
        
    }
}

const createAccountService = async ({ name, email, password, avatar }) => {
    const account = await Account.findOne({ email });
    if (account) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await Account.create({ name, email, password: hashedPassword, avatar });
    return newAccount;
}



module.exports = {
    getAccount,
    getAllAccounts,
    updateAccount,
    createAccountService
}