import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getChat } from "../../service/chatService";

function ListChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, /*setWs*/] = useState(null); // State để lưu WebSocket instance
  const messagesEndRef = useRef(null);

  // ID của người dùng hiện tại 
  const currentUserId = null;
  const receiverId =4; // ID của người nhận 

  // Hàm để tải lịch sử tin nhắn từ API
  const getHistory = async () => {
    try {
      const response = await getChat(receiverId);
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Hàm để gửi tin nhắn qua WebSocket
  const sendMessage = () => {
    if (input.trim() === "") return;

    if (ws) {
      const newMessage = {
        type: "sendMessage",
        data: {
          sender_id: currentUserId,
          receiver_id: receiverId,
          message: input,
        },
      };
      ws.send(JSON.stringify(newMessage));
      setInput(""); 
    } else {
      console.error("WebSocket is not connected");
    }
  };

  // Thiết lập WebSocket và tải lịch sử tin nhắn khi component mount
  useEffect(() => {
    // Tải lịch sử tin nhắn
    getHistory();

  }, [currentUserId]);
// Cuộn xuống cuối danh sách tin nhắn khi có tin nhắn mới
useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="mx-auto bg-[#101417] overflow-hidden flex flex-col w-full h-full">
      <div className="bg-[#101417] border border-[#3C444F] text-white text-lg font-semibold p-4 flex items-center gap-2">
        <Link to={"/profile"} className="flex items-center p-1">
          <img className="w-10 h-10 rounded-full" src="./avatar.png" alt="" />
          <span className="font-bold ml-2">dev</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 border-l border-l-[#3C444F]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 max-w-xs rounded-lg ${
              msg.sender_id === currentUserId
                ? "bg-[#101417] text-white self-end ml-auto border"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.message} 
            <span>{msg.sent_at}</span>
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
  );
}

export default ListChat;