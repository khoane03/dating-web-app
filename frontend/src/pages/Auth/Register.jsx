import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    document.title = "Đăng ký";
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-gradient-to-bl to-[#5158CC] from-[#C251C3] h-screen w-screen flex justify-center items-center">
            <div className="w-[780px] h-[385px] bg-white flex justify-center items-center rounded-xl shadow-2xl">

                <div className="flex flex-col items-center justify-center mx-8 w-full h-auto">
                    <h1 className="text-2xl font-bold text-center pb-2 w-full border-b border-gray-300">Đăng ký</h1>
                    <input type="email" className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" placeholder="Nhập email" />
                    <input type="text" className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none" placeholder="Nhập số điện thoại" />



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

                    <input
                        type={showPassword ? "text" : "password"}
                        className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                        placeholder="Nhập lại khẩu"
                    />


                    <div className="p-2 flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <input type="checkbox" id="checkbox" className="mr-2" />
                            <label htmlFor="checkbox" className="text-sm text-gray-500">Đồng ý điều khoản dich vụ</label>
                        </div>

                    </div>

                    <button className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                        Đăng ký ngay
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>

                </div>
                <div className=" flex flex-col items-center justify-center bg-[#FB9EC4] w-full h-full rounded-s-[90px] rounded-e-xl">
                    <span className="text-2xl font-bold text-center mb-2">Tình yêu đang chờ bạn ❤️ Đăng ký ngay hôm nay!</span>
                    <Link to={"/login"} className="text-xl text-center text-gray-600 cursor-pointer hover:text-gray-950">Bạn đã có tài khoản?</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
