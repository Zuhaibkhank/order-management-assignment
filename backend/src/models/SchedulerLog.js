const mongoose = require("mongoose");

const schedulerLogSchema = new mongoose.Schema(
  {
    totalOrders: Number,

    updatedOrders: Number,

    executionTime: {
      type: Date,
      default: Date.now,
    },

    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SchedulerLog", schedulerLogSchema);