import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getListChat } from "../../service/chatService";

function Menu() {

  const [listChat, setListChat] = useState([]);


  useEffect(() => {
    (async () => {
      const res = await getListChat();
      setListChat(res.data);
    })();
  }, []);

  return (
    <>
      {listChat.map((chat, index) => (
        <NavLink key={index} to={`/chat/${chat.chat_id}`} className="flex flex-row items-center hover:bg-pink-200 p-1 rounded-xl">
          <img className="w-10 h-10 rounded-full" src={chat.avatar_url} alt="" />
          <span className="ml-2 font-bold">{chat.full_name}</span>
        </NavLink>
      ))}
    </>
  );

}

export default Menu;