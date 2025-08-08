const Account = require("@models/Account");
const RefreshToken = require("@models/RefreshToken");
const bcrypt = require("bcryptjs");
const { generateTokens, verifyRefreshToken } = require("@utils/JWT/jwt");

const registerAccount = async ({ name, email, password }) => {
    const account = await Account.findOne({ email });
    if (account) {
        throw new Error("Account already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await Account.create({ name, email, password: hashedPassword });
    const { accessToken, refreshToken } = generateTokens(newAccount);
    await RefreshToken.create({ token: refreshToken, account_id: newAccount._id });
    return { accessToken, refreshToken };
}

const loginAccount = async ({ email, password }) => {
    const account = await Account.findOne({ email });
    if (!account) {
        throw new Error("Invalid credentials");
    }
    const valid = await bcrypt.compare(password, account.password);
    if (!valid) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateTokens(account);
    await RefreshToken.create({ token: refreshToken, account_id: account._id });

    return { accessToken, refreshToken };
}

const logoutAccount = async (token) => {
    const deleted = await RefreshToken.findOneAndDelete({ token });
    if (!deleted) throw new Error("Invalid token");
    return { message: "Logged out successfully" };
}

const refreshTokenAccount = async ({ token }) => {
    const payload = verifyRefreshToken(token);
    const stored = await RefreshToken.findOne({ token });
    if (!stored) throw new Error("Invalid token");

    const account = await Account.findById(payload.id);
    const { accessToken, refreshToken } = generateTokens(account);

    await RefreshToken.create({ token: refreshToken, account_id: account._id });

    return { accessToken, refreshToken };
}

module.exports = { registerAccount, loginAccount, logoutAccount, refreshTokenAccount };