import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/alert/Alert";
import {
    sendOtp,
    verifyOtp,
    forgot_password,
    check_email
} from "../../service/authService";
import { validatePassword } from "../../validator/appValidate";

const Forgot = () => {
    document.title = "Quên mật khẩu";
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [hideOtp, setHideOtp] = useState(true);
    const [hideInputPassword, setHideInputPassword] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            setError("");
            setLoading(true);
            await check_email(email);
            await sendOtp(email);
            setHideOtp(false);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyOtp = async () => {
        try {
            setError("");
            setLoading(true);
            await verifyOtp(email, otp);
            setHideInputPassword(false);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {

        try {
            if (!validatePassword(password)) {
                setError("Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số!");
                return;
            }
            if (password !== confirmPassword) {
                setError("Mật khẩu không khớp!");
                return;
            }
            setError("");
            setLoading(true);
            const res = await forgot_password(email, password);
            setSuccess("Đặt lại mật khẩu thành công!");
            console.log(res.data?.message);
            setTimeout(() => {
                navigate("/auth");
            }, 2000);
        } catch (error) {
            setSuccess("");
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            hideOtp ? handleSendOtp() : handleVerifyOtp();
        }
    };

    return (
        <div>
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} onClose={false} />}
            {hideInputPassword ? <>
                <h1 className="text-2xl font-bold text-center pb-2 w-full border-b border-gray-300">Quên mật khẩu</h1>
                <input
                    type="text"
                    className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {
                    !hideOtp && <input
                        type="text"
                        className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                        placeholder="Nhập OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                }

                <button onClick={() => (hideOtp ? handleSendOtp() : handleVerifyOtp())}
                    disabled={loading || email === ""}
                    className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                    {loading ? (
                        <span className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : hideOtp ? "Gửi OTP" : "Xác nhận OTP"}
                </button>

            </>
                :
                <>
                    <h1 className="text-2xl font-bold text-center pb-2 w-full border-b border-gray-300">Nhập mật khẩu mới</h1>
                    <input
                        type="text"
                        className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                        placeholder="Nhập email của bạn"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button onClick={handleForgotPassword}
                        disabled={loading || password === "" || confirmPassword === ""}
                        className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                        {loading ? (
                            <span className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : "Xác nhận"}
                    </button>
                </>
            }

            <div className="mt-4 flex items-center justify-between w-[500px] h-full flex-wrap">
                <Link to={"/auth"} className=" text-gray-600 hover:underline cursor-pointer hover:text-gray-950">
                    Quay lại đăng nhập</Link>
                <Link to={"/auth/register"} className=" text-gray-600 hover:underline cursor-pointer hover:text-gray-950">
                    Bạn chưa có tài khoản?
                </Link>
            </div>
        </div>
    )
};
export default Forgot;