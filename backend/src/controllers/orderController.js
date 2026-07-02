const Order = require("../models/Order");
const StatusHistory = require("../models/StatusHistory");

// Create Order
const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            phoneNumber,
            productName,
            amount,
            paymentStatus,
        } = req.body;

        const order = await Order.create({
            customerName,
            phoneNumber,
            productName,
            amount,
            paymentStatus,
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.orderStatus = req.query.status;
        }

        if (req.query.search) {
            filter.$or = [
                {
                    customerName: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
                {
                    orderId: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
            ];
        }

        const total = await Order.countDocuments(filter);

        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalOrders: total,
            count: orders.length,
            data: orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get Single Order
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success:false,
                message:"Order not found",
            });

        }

        const oldStatus = order.orderStatus;

        order.orderStatus = req.body.orderStatus;

        await order.save();

        

        await StatusHistory.create({

            orderId: order._id,
            previousStatus: oldStatus,
            newStatus: order.orderStatus,

        });

        res.status(200).json({

            success:true,
            data:order,

        });

    } catch (error) {

    console.error("PATCH ERROR:");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
        success: false,
        message: error.message,
    });

}
};

const getStatusHistory = async (req, res) => {
    try {
        const history = await StatusHistory.find({
            orderId: req.params.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            data: history,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                paymentStatus: req.body.paymentStatus,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: updatedOrder,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    getStatusHistory,
};