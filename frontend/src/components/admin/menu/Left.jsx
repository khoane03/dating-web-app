import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faUser, faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { logout } from "../../../service/authService";
import { useState } from "react";
import Alert from "../../alert/Alert";

const MenuItem = ({ icon, text, link }) => (

  <NavLink to={link} end
    className={({ isActive }) =>
      `p-3 font-bold flex items-center gap-2 rounded-s-3xl cursor-pointer relative text-gray-600 
      ${isActive ?
        "bg-gray-100 before:absolute before:content-[''] before:right-0 before:rounded-full before:bg-transparent before:w-8 before:h-8 before:top-[-32px] before:shadow-[18px_18px_0_3px_#F3F4F6] after:absolute after:content-[''] after:right-0 after:rounded-full after:bg-transparent after:w-8 after:h-8 after:bottom-[-32px] after:shadow-[18px_-18px_0_3px_#F3F4F6]" : ""} 
        `}>
    <FontAwesomeIcon icon={icon} /> {text}
  </NavLink>
);

const Left = () => {

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      setSuccess("Đăng xuất thành công");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }

  }
  const menuItems = [
    { icon: faChartSimple, text: "Tổng Quan", link: "/admin" },
    { icon: faUser, text: "Quản lý tài khoản", link: "/admin/account" },
    { icon: faHeart, text: "Quản lý ghép đôi", link: "/admin/match" },
    { icon: faUser, text: "Thông tin Admin", link: "/admin/info" },

  ];

  return (
    <>
      {error && <Alert type={'error'} message={error} onClose={()=> setError("")} />}
      {success && <Alert type={'success'} message={success} onClose={()=> setSuccess("")} />}
      <div className="w-64 bg-purple-400 shadow-md h-screen pl-4 rounded-e-xl fixed z-1">
        <h1 className="my-7 text-center text-2xl font-bold text-white">DATING</h1>
        <div>
          {menuItems.map((item, index) => (
            <MenuItem key={index} icon={item.icon} text={item.text} link={item.link} />
          ))}

          <button onClick={handleLogout}
            className="p-3 my-6 font-bold flex items-center gap-2 rounded-3xl cursor-pointer relative text-gray-600 hover:bg-pink-400 hover:text-white">
            <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
};

export default Left;

