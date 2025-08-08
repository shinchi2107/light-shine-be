const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    token: { type: String, required: true },
}, { timestamps: true });

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;