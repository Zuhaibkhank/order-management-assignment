const mongoose = require("mongoose");

const statusHistorySchema = new mongoose.Schema(
{
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },

    previousStatus: {
        type: String,
        required: true,
    },

    newStatus: {
        type: String,
        required: true,
    },

    changedAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "StatusHistory",
    statusHistorySchema
);