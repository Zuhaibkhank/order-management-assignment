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

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Order Management API is Running 🚀"
    });
});

module.exports = app;