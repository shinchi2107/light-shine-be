const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    table_id: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    total_price: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;