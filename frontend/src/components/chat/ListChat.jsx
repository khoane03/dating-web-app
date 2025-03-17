import { faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getChat, getInfoUserChat } from "../../service/chatService";
import { getUserLogin } from "../../service/userService";

function ListChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const currentUserId = useRef(null);
  const receiverId = useParams().id;
  const [infoUser, setInfoUser] = useState({});


  const getUser = async () => {
    try {
      const response = await getUserLogin();
      currentUserId.current = response.data.id;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Hàm để tải lịch sử tin nhắn từ API
  const getHistory = async () => {
    try {
      const response = await getChat(receiverId);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const getInfoUser = async () => {
    try {
      const response = await getInfoUserChat(receiverId);
      console.log(response);
      setInfoUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Hàm để gửi tin nhắn qua WebSocket
  const sendMessage = () => {
    if (input.trim() === "") return;

    if (wsRef.current) {
      const newMessage = {
        type: "sendMessage",
        data: {
          sender_id: currentUserId.current,
          receiver_id: receiverId,
          message: input,
        },
      };
      wsRef.current.send(JSON.stringify(newMessage));
      setInput("");
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const connectWebSocket = () => {
    console.log("Connecting WebSocket...");

    if (wsRef.current) {
      console.log("WebSocket is already connected");
      return;
    }
    const wss = new WebSocket("ws://localhost:3000");

    //kết nối websocket
    wss.onopen = () => {
      wsRef.current = wss;
      console.log("Connected");
      const joinMessage = {
        type: "join",
        userId: currentUserId.current,
      };
      wss.send(JSON.stringify(joinMessage));
    };

    //nhận tin nhắn từ server
    wss.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setMessages((prev) => [...prev, data.data.data]);
      } catch (error) {
        console.error("Lỗi parse JSON:", error);
      }
    };

    wss.onerror = (err) => console.error("Error:", err);
    wss.onclose = () => console.log("Disconnected");

  };

  useEffect(() => {
    getUser();
    connectWebSocket();
  }, []);

  useEffect(() => {
    if (receiverId) {
      getHistory();
      getInfoUser();
    }
  }, [receiverId]);
  // Cuộn xuống cuối danh sách tin nhắn khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {receiverId ? <div className="mx-auto bg-[#101417] overflow-hidden flex flex-col w-full h-full">
        <div className="bg-[#101417] border border-[#3C444F] text-white text-lg font-semibold p-4 flex items-center gap-2">
          <Link to={"/profile"} className="flex items-center p-1">
            <img className="w-10 h-10 rounded-full" src={infoUser.avatar_url} alt="" />
            <span className="font-bold ml-2">{infoUser.full_name}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 border-l border-l-[#3C444F]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-xs rounded-lg ${msg.sender_id === currentUserId.current
                ? "bg-[#101417] text-white self-end ml-auto border"
                : "bg-gray-200 text-gray-800"
                }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 flex items-center gap-2 border-t border-[#3C444F]">
          <input
            type="text"
            className="flex-1 py-2 px-4 focus:outline-none bg-[#101417] text-white"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-dark text-white p-2 rounded-lg hover:text-[#FD2B75]"
            onClick={sendMessage}
          >
            <FontAwesomeIcon
              className="bg-gray-500 p-4 rounded-2xl"
              icon={faPaperPlane}
            />
          </button>
        </div>
      </div>
        :
        <div className="text-white flex flex-col items-center justify-center h-full">
          <FontAwesomeIcon className="text-4xl" icon={faMessage} />
          <p className="text-center text-white">Chọn một cuộc trò chuyện</p>
        </div>}
    </>
  );
}

export default ListChat;