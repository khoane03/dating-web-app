import { Link, NavLink, Outlet } from "react-router-dom";
import Tinder from "../../components/Tinder";
import Profile from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome, faMessage } from "@fortawesome/free-solid-svg-icons";
const HomePage = () => {


  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="w-full h-14 bg-white shadow-md z-10 p-4 flex justify-between items-center fixed">
        <Link to={"/"} className="text-2xl font-bold text-pink-600">Dating App</Link>
        <nav>
          <button className="bg-transparent hover:underline text-pink-600"></button>
          <Link to={"/logout"}
            className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-600 hover:text-white ml-2">
            Đăng Xuất</Link>
        </nav>
      </header>

      <div className=" bg-[#101417] flex grow justify-between gap-2 mt-14 fixed right-0 left-0 bottom-0 top-0">
        <div className="bg-pink-100 min-h-screen flex flex-col justify-start flex-3 border-r border-gray-300">
          <nav className="w-full h-20 flex flex-row justify-between items-center bg-gradient-to-bl from-[#FD2B75] to-[#FF5D3A] rounded-b-xl">
            <Link to={"/profile"} className="flex items-center ml-4 hover:bg-[#471F27] p-1 rounded-full">
              <img className="w-10 h-10 rounded-full"
                src="/avatar.png" alt="" />
              <span className="font-bold text-2xl ml-2 text-gray-200">dev</span>
            </Link>
            <div className="flex items-center gap-4 mr-4 ">
              <NavLink to={"/chat"} className="text-xl font-bold text-gray-200 hover:text-[#FD2B75] bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                <FontAwesomeIcon icon={faMessage} />
              </NavLink>
              <NavLink to={"/notification"} className="text-xl font-bold text-gray-200 hover:text-green-400 bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                <FontAwesomeIcon icon={faBell} />
              </NavLink>
            </div>

          </nav>

          <div className="m-4">
            
              
          </div>
        </div>

        
        <div className="flex flex-8 justify-center items-center">
          <Outlet/>
        </div>

      </div>
    </div>
  );
};

export default HomePage;