const express = require("express");

const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
} = require("../controllers/orderController");

router
    .route("/")
    .post(createOrder)
    .get(getAllOrders);

router
    .route("/:id")
    .get(getOrderById);

router
    .route("/:id/status")
    .patch(updateOrderStatus);

router
    .route("/:id/payment")
    .patch(updatePaymentStatus);

module.exports = router;