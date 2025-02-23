import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function ListChat() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you?", sender: "bot" },
        { id: 2, text: "I have a question about my order.", sender: "user" },
        { id: 3, text: "Sure! What would you like to know?", sender: "bot" },
        { id: 4, text: "When will it be delivered?", sender: "user" },
        { id: 5, text: "Your order is expected to arrive by tomorrow.", sender: "bot" },
        { id: 6, text: "Thank you!", sender: "user" },
        { id: 7, text: "You're welcome! Let me know if you need anything else.", sender: "bot" },
        { id: 8, text: "Hello! How can I help you?", sender: "bot" },
        { id: 9, text: "I have a question about my order.", sender: "user" },
        { id: 10, text: "Sure! What would you like to know?", sender: "bot" },
        { id: 11, text: "When will it be delivered?", sender: "user" },
        { id: 12, text: "Your order is expected to arrive by tomorrow.", sender: "bot" },
        { id: 13, text: "Thank you!", sender: "user" },
        { id: 14, text: "You're welcome! Let me know if you need anything else.", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() === "") return;
        const newMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput("");

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: "This is an automated response!", sender: "bot" },
            ]);
        }, 1000);
    };

    return (
        <div className="mx-auto bg-[#101417] overflow-hidden flex flex-col w-full h-full ">
            <div className="bg-[#101417] border border-[#3C444F] text-white text-lg font-semibold p-4 flex items-center gap-2">
                <Link to={"/profile"} className="flex items-center p-1">
                <img className="w-10 h-10 rounded-full"
                 src="./avatar.png" alt="" />
                <span className="font-bold ml-2">dev</span>
                </Link>
                
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 border-l border-l-[#3C444F]}">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 max-w-xs rounded-lg ${msg.sender === "user"
                                ? "bg-[#101417] text-white self-end ml-auto border"
                                : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4  flex items-center gap-2 border-t border-[#3C444F]">
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
                    <FontAwesomeIcon className="bg-gray-500 p-4 rounded-2xl" icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default ListChat;