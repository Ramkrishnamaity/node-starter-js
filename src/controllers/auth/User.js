import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { CreateToken, InputValidator, StatusCode } from "../../lib/utils/index.js";
import UserModel from "../../models/User.js";

const login = async (req, res) => {
    try {

        InputValidator(req.body, {
            email: "required|email",
            password: "required|minLength:6",
        }).then(async () => {

            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                res.status(StatusCode.NOT_FOUND_ERROR).json({
                    status: false,
                    message: "User Not Found!"
                });
            } else {
                if (!compareSync(password, user.password)) {
                    res.status(StatusCode.AUTH_ERROR).json({
                        status: false,
                        message: "User or Password Not Match!"
                    });
                } else {
                    const token = CreateToken({ _id: user._id });
                    res.status(StatusCode.SUCCESS).json({
                        status: true,
                        message: "Logged In Successfully.",
                        data: {
                            token
                        }
                    });
                }
            }

        }).catch(error => {
            res.status(StatusCode.VALIDATION_ERROR).json({
                status: false,
                message: error
            });
        });

    } catch (error) {
        res.status(StatusCode.SERVER_ERROR).json({
            status: false,
            message: "Server Error!",
            error
        });
    }
};

const register = async (req, res) => {
    try {

        InputValidator(req.body, {
            name: "required|maxLength:10",
            email: "required|email",
            password: "required|minLength:6",
        }).then(async () => {

            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (user) {
                res.status(StatusCode.BAD_REQUEST).json({
                    status: false,
                    message: "User Already Exist!"
                });
            } else {
                const salt = genSaltSync(10);
                const hashedPassword = hashSync(password, salt);

                UserModel.create({
                    ...req.body,
                    password: hashedPassword
                }).then(() => {
                    res.status(StatusCode.SUCCESS).json({
                        status: true,
                        message: "User Added Successfully."
                    });
                }).catch((error) => {
                    res.status(StatusCode.SERVER_ERROR).json({
                        status: false,
                        message: "Server Error!",
                        error
                    });
                });

            }

        }).catch(error => {
            res.status(StatusCode.VALIDATION_ERROR).json({
                status: false,
                message: error
            });
        });

    } catch (error) {
        res.status(StatusCode.SERVER_ERROR).json({
            status: false,
            message: "Server Error!",
            error
        });
    }
};

const UserAuthController = {
    login,
    register
};

export default UserAuthController;