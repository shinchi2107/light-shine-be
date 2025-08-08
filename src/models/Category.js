const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;