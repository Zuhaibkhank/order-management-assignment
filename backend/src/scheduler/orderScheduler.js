const cron = require("node-cron");

const Order = require("../models/Order");
const StatusHistory = require("../models/StatusHistory");
const SchedulerLog = require("../models/SchedulerLog");

const placedToProcessing =
    Number(process.env.PLACED_TO_PROCESSING_MINUTES);

const processingToReady =
    Number(process.env.PROCESSING_TO_READY_MINUTES);

const runScheduler = () => {
    cron.schedule("*/5 * * * *", async () => {
        console.log("⏳ Scheduler Running...");

        let checked = 0;
        let updated = 0;

        try {
            const orders = await Order.find();

            checked = orders.length;

            for (const order of orders) {
                const minutes =
                    (Date.now() - order.createdAt.getTime()) / (1000 * 60);

                let oldStatus = order.orderStatus;
                let newStatus = oldStatus;

                if (
                    oldStatus === "PLACED" &&
                    minutes >= placedToProcessing
                ) {
                    newStatus = "PROCESSING";
                }

                else if (
                    oldStatus === "PROCESSING" &&
                    minutes >= processingToReady
                ) {
                    newStatus = "READY_TO_SHIP";
                }

                if (oldStatus !== newStatus) {

                    order.orderStatus = newStatus;

                    await order.save();

                    await StatusHistory.create({
                        orderId: order._id,
                        previousStatus: oldStatus,
                        newStatus: newStatus,
                    });

                    updated++;
                }
            }

            await SchedulerLog.create({
                totalOrdersChecked: checked,
                totalOrdersUpdated: updated,
                message: "Scheduler executed successfully",
            });

            console.log(`✅ Checked ${checked} orders | Updated ${updated}`);

        } catch (error) {

            console.error(error);

            await SchedulerLog.create({
                totalOrdersChecked: checked,
                totalOrdersUpdated: updated,
                message: error.message,
            });
        }
    });
};

module.exports = runScheduler;