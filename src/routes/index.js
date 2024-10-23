import express from "express";
import multer from "multer";
import UserApiRouter from "./User.js";
import middleware from "../lib/utils/Middleware.js";
import UserAuthController from "../controllers/auth/User.js";
import UploadController from "../controllers/User/Upload.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ApiRouter = express.Router();

// auth routes
ApiRouter.post("/user/login", UserAuthController.login);
ApiRouter.post("/user/register", UserAuthController.register);

ApiRouter.use(middleware);

ApiRouter.post("/upload", upload.single("file"), UploadController.fileUpload);

ApiRouter.use("/user", UserApiRouter);

export default ApiRouter;