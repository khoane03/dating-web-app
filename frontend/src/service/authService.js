import { axiosService } from "./axiosService";
import { removeAccessToken } from "./localstore";

const login = async (email, password) => {
    return await axiosService.post("/auth/login", { email, password }
    );
};
const refreshToken = async () => {
    return await axiosService.post("/auth/refresh_token",

    );
}

const check_email = async (email) => {
    return await axiosService.post("/auth/check_email", { email });
}

const forgot_password = async (email, password) => {
    return await axiosService.put("/auth/forgot_password", { email, password });
}

const loginWithGoogle = async () => {
    window.location.href = "http://localhost:3000/auth/google";
}

const register = async (data) => {
    return await axiosService.post("/auth/register", {
        email: data.email,
        password: data.password,
        phone: data.phone
    });
}

const logout = async () => {
    removeAccessToken();
    return await axiosService.get("/auth/logout");
}

const sendOtp = async (email) => {
    return await axiosService.post("/auth/send_otp", { email });
}

const verifyOtp = async (email, otp) => {
    return await axiosService.post("/auth/verify_otp", { email, otp });
}

export {
    login,
    forgot_password,
    check_email,
    loginWithGoogle,
    register,
    logout,
    sendOtp,
    verifyOtp,
    refreshToken
}