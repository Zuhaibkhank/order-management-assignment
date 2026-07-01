const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: ["PLACED", "PROCESSING", "READY_TO_SHIP"],
      default: "PLACED",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate Order ID
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = `ORD-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);