require("dotenv").config();
const runScheduler = require("./scheduler/orderScheduler");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    runScheduler();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();