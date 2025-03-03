import { Link, Outlet } from "react-router-dom";
const AuthForm = () => {
    return (
        <div className="bg-gradient-to-bl from-[#5158CC] to-[#C251C3] h-screen w-screen flex justify-center items-center">
        <div className="w-[780px] h-[385px] bg-white flex justify-center items-center rounded-xl shadow-2xl">
            <Outlet/>
        </div>
    </div>
    );
};
export default AuthForm;