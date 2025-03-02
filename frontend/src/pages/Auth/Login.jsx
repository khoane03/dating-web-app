import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
    login as loginWithEmail,
    loginWithGoogle
} from "../../service/authService";
import {
    setAccessToken,
} from "../../service/localstore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/alert/Alert";



const Login = () => {
    document.title = "Đăng nhập";
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        const savedUsername = localStorage.getItem("username") || "";
        const savedPassword = localStorage.getItem("password") || "";
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMe = () => {
        if (rememberMe) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
    };

    const login = async () => {
        setError("");
        try {
            const response = await loginWithEmail(username, password);
            setAccessToken(response.data.accessToken);
            handleRememberMe();
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    return (
        <>
        {error && <Alert type="error" message={error}/>}
            <div className="flex flex-col items-center justify-center mr-8 bg-[#FB9EC4] w-full h-full rounded-l-xl rounded-e-[90px] animate-slide-right">
                <span className="text-2xl font-bold text-center mb-2">
                    Đừng để trái tim cô đơn ❤️ Hãy để chúng tôi tìm người ấy cho bạn!
                </span>
                <Link to={"register"} className="text-xl text-center text-gray-600 cursor-pointer hover:text-gray-950">
                    Bạn chưa có tài khoản?
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center mr-8 w-full h-full">

                <h1 className="text-2xl font-bold text-center pb-2 w-full">Đăng nhập</h1>
                <FontAwesomeIcon
                    onClick={handleGoogleLogin}
                    icon={faGoogle}
                    className="text-white cursor-pointer p-2 hover:bg-red-500 bg-red-400 rounded-xl"
                />
                <span className="text-sm text-gray-500 mt-2">Hoặc đăng nhập với </span>

                <input
                    type="text"
                    className="bg-gray-200 rounded-xl px-4 py-2 my-2 w-full outline-none"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />


                <div className="bg-gray-200 flex items-center justify-center w-full rounded-xl">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="rounded-xl px-4 py-2 w-full outline-none"
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


                <div className="p-2 flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="checkbox" className="text-sm text-gray-500">Nhớ đăng nhập</label>
                    </div>
                    <div>
                        <Link to={'forgot'} className="text-sm text-gray-500 hover:underline">Quên mật khẩu?</Link>
                    </div>
                </div>
                <button
                    onClick={login}
                    onKeyDown={(e) => e.key === "Enter" && login()}
                    type="button"
                    className="w-full font-bold text-dark px-4 py-2 rounded-full bg-[#53CCEC] hover:bg-[#53CCCC] flex items-center justify-center">
                    Đăng nhập
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </>
    );
};

export default Login;