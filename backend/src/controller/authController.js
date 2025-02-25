import apiResponse from "../utils/apiResponse.js";
import {
  login as loginService,
  register as registerService,
  sendOtp as sendOtpService,
  verifiyOtp as verifiyOtpService,
  refreshToken as refreshTokenService,
  handleGoogleCallback as googleLoginCallbackService
} from "../service/authService.js";
import passport from "../config/googleConfig.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  return apiResponse(res, result.code, result.message, result.data);
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});


export const googleCallback = async (req, res) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      return apiResponse(res, 401, "Lỗi đăng nhập bằng Google", err);
    }
    const result = await googleLoginCallbackService(user.user);
    return apiResponse(res, result.code, result.message, result.data);
  })(req, res);
};

export const register = async (req, res) => {
  const { email, password, phone } = req.body;
  const result = await registerService(email, password, phone);
  return apiResponse(res, result.code, result.message, result.data);
};

export const refreshToken = async (req, res) => {
  const { token } = req.body;
  const result = await refreshTokenService(token);
  return apiResponse(res, result.code, result.message, result.data);
}

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const result = await sendOtpService(email);
  return apiResponse(res, result.code, result.message);
}

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const result = await verifiyOtpService(email, otp);
  return apiResponse(res, result.code, result.message);
}


