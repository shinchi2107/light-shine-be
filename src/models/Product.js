const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    compare_price: { type: Number, default: 0 },
    description: { type: String, default: null },
    images: { type: Array, default: [] },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;