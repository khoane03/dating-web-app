import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gradient-to-bl from-[#5158CC] to-[#C251C3] h-screen w-screen flex justify-center items-center">
            <div className="w-[780px] h-[385px] bg-white flex justify-center items-center rounded-xl shadow-2xl">
                <div className=" flex flex-col items-center justify-center mr-8 bg-[#FB9EC4] w-full h-full rounded-l-xl rounded-e-[90px]">
                    <span className="text-2xl font-bold text-center mb-2">Đừng để trái tim cô đơn ❤️ Hãy để chúng tôi tìm người ấy cho bạn!</span>
                    <a className="text-xl text-center text-gray-600 cursor-pointer hover:text-gray-950">Bạn chưa có tài khoản?</a>
                </div>
                <div className="flex flex-col items-center justify-center mr-8 w-full h-full">
                    <h1 className="text-2xl font-bold text-center pb-2 w-full">Đăng nhập</h1>
                    <FontAwesomeIcon icon={faGoogle} className="text-white cursor-pointer p-2 hover:bg-red-500 bg-red-400 rounded-xl" />
                    <span className="text-sm text-gray-500 mt-2">Hoặc đăng nhập với </span>
                    <input type="text" className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" placeholder="Tài khoản" />

                    <div className="bg-gray-200 flex items-center justify-center w-full rounded-xl">
                        <input
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

                    <div className="p-2 flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <input type="checkbox" id="checkbox" className="mr-2" />
                            <label htmlFor="checkbox" className="text-sm text-gray-500">Nhớ đăng nhập</label>
                        </div>
                        <div>
                            <a href="#" className="text-sm text-gray-500 hover:underline">Quên mật khẩu?</a>
                        </div>
                    </div>

                    <button className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                        Đăng nhập
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Login;
