import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
    login as loginWithEmail,
} from "../../../service/authService";
import {
    setAccessToken,
} from "../../../service/localstore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../alert/Alert";



const AdminLogin = () => {
    document.title = "Đăng nhập quản trị";
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const login = async () => {
        setError("");
        try {
            const response = await loginWithEmail(username, password);
            setAccessToken(response.data.accessToken);
            navigate("/admin");
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };
    return (
        <div className="bg-gradient-to-bl from-[#5158CC] to-[#C251C3] h-screen w-screen flex justify-center items-center">
            {error && <Alert type="error" message={error} />}

            <div className="border-4 border-double flex flex-col p-6 items-center justify-center mr-8 w-md h-auto bg-transparent opacity rounded-xl shadow-md animate-scale">

                <h1 className="text-2xl text-white font-bold text-center pb-2 w-full">Đăng nhập quản trị</h1>

                <input
                    type="text"
                    className="bg-gray-200 border-1 border-pink-500 rounded-xl px-4 py-2 my-2 w-full outline-none"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="bg-gray-200 flex items-center justify-center w-full rounded-xl my-4 border-1 border-pink-500">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="rounded-xl px-4 py-2 w-full outline-none "
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && login()}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="px-4 pr-2 cursor-pointer"
                        onClick={handleShowPassword}
                    />
                </div>

                <button
                    onClick={login}
                    onKeyDown={(e) => e.key === "Enter" && login()}
                    type="button"
                    className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53ecd5] hover:bg-[#53CCCC] flex items-center justify-center">
                    Đăng nhập
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;