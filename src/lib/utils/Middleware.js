import jwt from "jsonwebtoken";
import { StatusCode } from "./index.js";

const middleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            res.status(StatusCode.AUTH_ERROR).json({
                status: false,
                message: "Credential Not Found!",
            });
        } else {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decode;
                next();
            } catch (error) {
                res.status(StatusCode.AUTH_ERROR).json({
                    status: false,
                    message: "Token Expired!",
                    error
                });
            }
        }

    } catch (error) {
        res.status(StatusCode.SERVER_ERROR).json({
            status: false,
            message: "Server Error!",
            error
        });
    }
};

export default middleware;