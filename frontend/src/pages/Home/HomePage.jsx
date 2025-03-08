import {
  Link,
  NavLink,
  Outlet,
  useLocation
} from "react-router-dom";
import Menu from "../../components/chat/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMagnifyingGlass,
  faMessage,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/search/Search";
import { logout } from "../../service/authService";
import { useEffect, useState } from "react";
import { getUserLogin } from "../../service/userService";
import Alert from "../../components/alert/Alert";
import ListMatched from "../../components/matched/ListMatched";

const HomePage = () => {
  const location = useLocation();
  document.title = "Trang chủ";
  const [info, setInfo] = useState({
    name: "",
    avatar: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [matched, setMatched] = useState(
    {
      id: "1",
      avatar_url: "hinh1.png",
      full_name: "Dev"
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserLogin();
        setInfo({
          name: res.data.full_name,
          avatar: res.data.avatar_url
        });
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUser();
  }, []);


  const handleLogout = async () => {
    try {
      await logout();
      setSuccess("Đăng xuất thành công");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 2000);
    } catch (error) {

    }
  };

  return (
    <>
      {error && <Alert type={"error"} message={error} onClose={() => setError("")} />}
      {success && <Alert type={"success"} message={success} onClose={() => setSuccess("")} />}
      <div className="h-full flex flex-col ">
        <header className="w-full h-14 bg-white shadow-md p-4 flex justify-between items-center fixed">
          <Link to={"/"} className="text-2xl font-bold text-pink-600">Dating App</Link>
          <nav>
            <button className="bg-transparent hover:underline text-pink-600"></button>
            <button onClick={handleLogout}
              className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-600 hover:text-white ml-2">
              Đăng Xuất</button>
          </nav>
        </header>

        <div className=" bg-[#101417] flex grow justify-between mt-14 fixed right-0 left-0 bottom-0 top-0">
          <div className="bg-pink-100 min-h-screen flex flex-col justify-start flex-3 border-r border-gray-300">
            <nav className="w-full h-20 flex flex-row justify-between items-center bg-gradient-to-bl from-[#FD2B75] to-[#FF5D3A] rounded-b-xl">
              <Link to={"/profile"} className="flex items-center w-[110px] h-[50px] overflow-hidden ml-4 hover:bg-[#471F27] p-1 rounded-full">
                <img className="w-10 h-10 rounded-full"
                  src={info.avatar} alt="" />
                <span className="font-bold text-sm ml-2 text-gray-200">
                  {info.name}
                </span>
              </Link>
              <div className="flex items-center gap-4 mr-4 ">
                <NavLink to={"/add"} className="text-xl font-bold text-gray-200 hover:text-[#FD2B75] bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <FontAwesomeIcon icon={faPlus} />
                </NavLink>
                <NavLink to={"/search"} className="text-xl font-bold text-gray-200 hover:text-[#FD2B75] bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
                <NavLink to={"/chat"} className="text-xl font-bold text-gray-200 hover:text-[#FD2B75] bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <FontAwesomeIcon icon={faMessage} />
                </NavLink>
                <NavLink to={"/notification"} className="text-xl font-bold text-gray-200 hover:text-green-400 bg-[#471F27] p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <FontAwesomeIcon icon={faBell} />
                </NavLink>
              </div>

            </nav>

            <div className="m-4">
              {
                location.pathname === "/chat" ? <Menu /> 
                : location.pathname === "/search" ? <Search /> 
                : location.pathname === "/" ? <ListMatched id={matched.id} avatar_url={matched.avatar_url} full_name={matched.full_name}/> :<></>
              }
            </div>
          </div>


          <div className="flex flex-8 justify-center items-center">
            <Outlet />
          </div>

        </div>
      </div>
    </>
  );
};

export default HomePage;