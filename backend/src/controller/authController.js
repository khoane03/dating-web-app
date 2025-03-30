import apiResponse from "../utils/apiResponse.js";
import dotenv from 'dotenv';
import {
  login as loginService,
  register as registerService,
  forgotPassword as forgotPasswordService,
  checkEmailExist as checkEmailExistService,
  sendOtp as sendOtpService,
  verifyOtp as verifyOtpService,
  refreshToken as refreshTokenService,
  handleGoogleCallback as googleLoginCallbackService
} from "../service/authService.js";
import passport from "../config/googleConfig.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);

  if (result.code !== 200) {
    return apiResponse(res, result.code, result.message);
  }
  const { accessToken, refreshToken } = result.data;
  setCookie(res, "refreshToken", refreshToken);
  return apiResponse(res, result.code, result.message, { accessToken });
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
 
  return apiResponse(res, 200, "Đăng xuất thành công!");
};

export const googleCallback = async (req, res) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.redirect(process.env.CLIENT_URL + "/login");
    }
    const result = await googleLoginCallbackService(user.user);
    console.log(result);
    const { refreshToken } = result.data;
    setCookie(res, "refreshToken", refreshToken);
    setTimeout(() => {
      res.redirect(process.env.CLIENT_URL);
    }
      , 2000
    );
  })(req, res);
};

const setCookie = (res, key, value) => {
  res.cookie(key, value, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  const { email, password, phone } = req.body;
  const result = await registerService(email, password, phone);
  return apiResponse(res, result.code, result.message, result.data);
};

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  const result = await forgotPasswordService(email, password);
  return apiResponse(res, result.code, result.message);
}

export const checkEmailExist = async (req, res) => {
  const { email } = req.body;
  const result = await checkEmailExistService(email);
  return apiResponse(res, result.code, result.message);
}

export const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return apiResponse(res, 401, "Token không hợp lệ!");
  }
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
  const result = await verifyOtpService(email, otp);
  return apiResponse(res, result.code, result.message);
}


