import express from "express";
import UserProfileController from "../controllers/User/Profile.js";

const ApiRouter = express.Router();

ApiRouter.get("/profile", UserProfileController.getProfile);

export default ApiRouter;