import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateRegister } from "../../validator/appValidate";
import Alert from "../../components/alert/Alert";
import {
    register,
    sendOtp,
    verifyOtp,
    check_email
} from "../../service/authService";


const Register = () => {
    document.title = "Đăng ký";
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [dataInput, setDataInput] = useState({
        email: "",
        otp: "",
        phone: "",
        password: "",
        confirmPassword: "",
        isAccept: false,
    });
    const timeout = 3000;
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setLoading(true);
            if (validateRegister(dataInput)) {
                setError(validateRegister(dataInput));
                return;
            }
            // const res = await check_email(dataInput.email);
            // if (res.code === 200) {
            //     setError("Email đã được sử dụng");
            //     return;
            // }
            await handleSendOtp();
        } catch (error) {
            setShowOtp(false);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        try {
            setLoading(true);
            await sendOtp(dataInput.email);
            setShowOtp(true);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await verifyOtp(dataInput.email, dataInput.otp);
            await register(dataInput);
            setTimeout(() => {
                navigate("/auth");
            }, timeout);
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };



    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {error && <Alert type="error" message={error} onClose={() => setError("")} />}
            {showOtp && <>
                <div className="w-screen h-screen fixed z-10 bg-gray-200 opacity-50"></div>
                <div className="fixed z-20 flex items-center justify-center w-screen h-screen">
                    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-xl">
                        <p className="text-center font-bold">Xác thực OTP</p>
                        <input value={dataInput.otp}
                            onChange={(e) => setDataInput({ ...dataInput, otp: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                            className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" type="text" />
                        <button onClick={handleVerifyOtp}
                            className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                            Xác thực
                        </button>
                    </div>
                </div>
            </>}
            <div className="flex flex-col items-center justify-center mx-8 w-full h-auto">
                <h1 className="text-2xl font-bold text-center pb-2 w-full border-b border-gray-300">Đăng ký</h1>
                <input
                    value={dataInput.email}
                    onChange={(e) => setDataInput({ ...dataInput, email: e.target.value })}
                    type="email" className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" placeholder="Nhập email" />
                <input value={dataInput.phone}
                    onChange={(e) => setDataInput({ ...dataInput, phone: e.target.value })}
                    type="text" className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" placeholder="Nhập số điện thoại" />
                <div className="bg-gray-200 flex items-center justify-center w-full rounded-xl">
                    <input
                        value={dataInput.password}
                        onChange={(e) => setDataInput({ ...dataInput, password: e.target.value })}
                        type={showPassword ? "text" : "password"}
                        className="rounded-xl px-4 py-2 w-full outline-none"
                        placeholder="Mật khẩu"
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="px-4 pr-2 cursor-pointer"
                        onClick={handleShowPassword}
                    />
                </div>

                <input value={dataInput.confirmPassword}
                    onChange={(e) => setDataInput({ ...dataInput, confirmPassword: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                    placeholder="Nhập lại khẩu"
                />


                <div className="p-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <input value={dataInput.isAccept} onChange={(e) => setDataInput({ ...dataInput, isAccept: e.target.checked })}
                            type="checkbox" id="checkbox" className="mr-2" />
                        <label htmlFor="checkbox" className="text-sm text-gray-500">Đồng ý điều khoản dich vụ</label>
                    </div>

                </div>

                <button disabled={!dataInput.isAccept}
                    onClick={handleRegister}
                    className={dataInput.isAccept ?
                        "w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center"
                        : "w-full font-bold text-dark px-4 py-2 rounded-full bg-gray-300 flex items-center justify-center"}>
                    {loading ? (
                        <span className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : "Đăng ký ngay"}

                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>



            </div>
            <div className=" flex flex-col items-center justify-center bg-[#FB9EC4] w-full h-full rounded-s-[90px] rounded-e-xl animate-slide-left ">
                <span className="text-2xl font-bold text-center mb-2">Tình yêu đang chờ bạn ❤️ Đăng ký ngay hôm nay!</span>
                <Link to={"/auth"} className="text-xl text-center text-gray-600 cursor-pointer hover:text-gray-950">Bạn đã có tài khoản?</Link>
            </div>
        </>
    );
}

export default Register;
