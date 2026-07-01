const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Order Management API is Running 🚀"
    });
});

const schedulerRoutes =
require("./routes/schedulerRoutes");

app.use(
    "/api/scheduler",
    schedulerRoutes
);
module.exports = app;