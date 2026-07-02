const express = require("express");

const router = express.Router();

const SchedulerLog = require("../models/SchedulerLog");

router.get("/logs", async (req, res) => {
    try {
        const logs = await SchedulerLog.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;