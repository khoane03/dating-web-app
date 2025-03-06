import express from "express";
import {
    login,
    register,
    forgotPassword,
    sendOtp,
    verifyOtp,
    refreshToken,
    googleLogin, 
    googleCallback,
    checkEmailExist,
    logout
} from "../controller/authController.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/send_otp", sendOtp);
authRouter.post("/verify_otp", verifyOtp);
authRouter.post("/refresh_token", refreshToken)
authRouter.get("/google", googleLogin);
authRouter.get("/google/callback",googleCallback);
authRouter.put("/forgot_password", forgotPassword);
authRouter.post("/check_email", checkEmailExist);
authRouter.get("/logout", logout);


export { authRouter };