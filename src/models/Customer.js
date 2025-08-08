const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    table_id: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
    refresh_token: { type: String, default: null },
    refresh_token_expires_at: { type: Date, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;