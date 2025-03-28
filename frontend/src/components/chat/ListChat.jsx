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

  const handleTime = (sent_at) => {
    const date = new Date(sent_at);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const optionsDate = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formattedDate = date.toLocaleDateString("en-US", optionsDate);
      const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
      return `${formattedDate} ${formattedTime}`;
    }
  };

  // Các hàm khác giữ nguyên
  const getUser = async () => {
    try {
      const response = await getUserLogin();
      currentUserId.current = response.data.id;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

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
      setInfoUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

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
    }
  };

  const connectWebSocket = () => {
    if (wsRef.current) return;
    const wss = new WebSocket("ws://localhost:3000");

    wss.onopen = () => {
      wsRef.current = wss;
      const joinMessage = {
        type: "join",
        userId: currentUserId.current,
      };
      wss.send(JSON.stringify(joinMessage));
    };

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
    const fetchData = async () => {
      await getUser();
      connectWebSocket();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (receiverId) {
      getHistory();
      getInfoUser();
    }
  }, [receiverId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {receiverId ? (
        <div className="mx-auto bg-[#101417] overflow-hidden flex flex-col w-full h-full">
          {/* Header */}
          <div className="bg-[#101417] border-b border-[#3C444F] text-white text-lg font-semibold p-4 flex items-center gap-2">
            <Link to={`/profile/${infoUser.id}`} className="flex items-center">
              <img className="w-10 h-10 rounded-full" src={infoUser.avatar_url} alt="" />
              <span className="font-bold ml-2">{infoUser.full_name}</span>
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index}
                className={`flex items-end gap-2 ${msg.sender_id === currentUserId.current ? "justify-end" : ""}`}>
                {msg.sender_id !== currentUserId.current && (
                  <Link to={`/profile/${infoUser.id}`}>
                    <img className="border border-pink-400 w-10 h-10 rounded-full" src={infoUser.avatar_url} alt="" />
                  </Link>
                )}

                <div className="group relative max-w-xs">
                  <div
                    className={`p-3 rounded-xl shadow-md ${msg.sender_id === currentUserId.current
                      ? "bg-[#FD2B75] text-white"
                      : "bg-gray-200 text-black"
                      }`}>
                    <span className="break-words whitespace-pre-wrap">
                      {msg.message}
                    </span>
                  </div>

                  {/* Tooltip thời gian với hiệu ứng đẹp hơn */}
                  <div className={` absolute ${msg.sender_id === currentUserId.current ? "right-0" : "left-0"}
                     bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}>
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-lg shadow-lg whitespace-nowrap ">
                      {handleTime(msg.sent_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {messages.length > 0 && (
              <div className={`text-gray-500 text-xs mb-3 ${messages[messages.length - 1].sender_id === currentUserId.current ? "text-end" : "text-start"}`}>
                {(messages[messages.length - 1].sender_id === currentUserId.current ? "Bạn" : infoUser.full_name) + " đã gửi: "}
                {handleTime(messages[messages.length - 1].sent_at)}
              </div>
            )}
          </div>
          {/* Input message */}
          <div className="p-4 flex items-center gap-3 border-t border-[#3C444F] bg-[#101417]">
            <input
              type="text"
              className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg focus:outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-[#FD2B75] text-white p-3 rounded-full hover:bg-[#e22665] transition-all duration-200"
              onClick={sendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white flex flex-col items-center justify-center h-full">
          <FontAwesomeIcon className="text-4xl mb-4" icon={faMessage} />
          <p className="text-center text-white">Chọn một cuộc trò chuyện</p>
        </div>
      )}
    </>
  );
}

export default ListChat;