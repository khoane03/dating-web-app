import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <>
      <NavLink to={""} className="flex flex-row items-center hover:bg-pink-200 p-1 rounded-xl">
        <img className="w-10 h-10 rounded-full"
          src="./avatar.png" alt=""
        />
        <span className="ml-2 font-bold">dev </span>
        
      </NavLink>

      <NavLink to={""} className="flex items-center hover:bg-pink-200 p-1 rounded-xl">
        <img className="w-10 h-10 rounded-full"
          src="./avatar.png" alt=""
        />
        <span className="ml-2 font-bold">dev</span>

      </NavLink>

      <NavLink to={""} className="flex items-center hover:bg-pink-200 p-1 rounded-xl">
        <img className="w-10 h-10 rounded-full"
          src="./avatar.png" alt=""
        />
        <span className="ml-2 font-bold">dev</span>

      </NavLink>
    </>
  );
}

export default Menu;