const protectScheduler = (req, res, next) => {

    const key = req.headers["x-secret-key"];

    if (key !== process.env.SECRET_KEY) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }

    next();

};

module.exports = protectScheduler;