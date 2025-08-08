const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    role: { type: String, enum: ["owner", "employee"], default: "employee" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;