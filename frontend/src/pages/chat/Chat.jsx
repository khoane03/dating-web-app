import { useState } from "react";
import { FaPhone, FaVideo, FaPaperPlane } from "react-icons/fa";

export default function Chat() {
  const [selectedPerson, setSelectedPerson] = useState("Voldemort");
  const people = [
    { name: "Vi", time: "2:50pm", preview: "How are u today?" },
    { name: "Trang", time: "2:25pm", preview: "Have u eaten yet..." },
    { name: "Theo", time: "2:12pm", preview: "Hi." },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-bl from-teal-400 to-white p-4">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-l-lg shadow-lg">
        <div className="p-4 border-b flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-teal-400 text-white font-bold rounded-full">H</div>
          <div>
            <p className="text-sm font-bold text-teal-600">Nhi</p>
            <p className="text-xs text-gray-500">Nhi@gmail.com</p>
          </div>
        </div>
        <ul>
          {people.map((person) => (
            <li
              key={person.name}
              className={`p-3 border-b cursor-pointer ${selectedPerson === person.name ? "bg-teal-50" : ""}`}
              onClick={() => setSelectedPerson(person.name)}
            >
              <p className="text-xs text-gray-600">{person.time}</p>
              <p className="font-bold text-gray-800">{person.name}</p>
              <p className="text-xs text-teal-600">{person.preview}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Chatbox */}
      <div className="w-3/4 bg-white rounded-r-lg shadow-lg flex flex-col">
        <div className="flex justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-teal-400 text-white font-bold rounded-full">V</div>
            <p className="text-gray-800 font-bold">{selectedPerson}</p>
          </div>
          <div className="flex gap-4 text-teal-500">
            <FaPhone className="cursor-pointer hover:scale-110" />
            <FaVideo className="cursor-pointer hover:scale-110" />
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="bg-gray-300 text-gray-800 p-2 rounded-lg w-2/3">How are you today?</div>
            <div className="bg-gray-300 text-gray-800 p-2 rounded-lg w-2/3 mt-2">What are you getting.. Oh, oops sorry dude.</div>
          </div>
          <div className="text-right">
            <div className="bg-teal-400 text-white p-2 rounded-lg inline-block">Nah, it's cool.</div>
            <div className="bg-teal-400 text-white p-2 rounded-lg inline-block mt-2">Well, you should get your Dad a cologne. Here, smell it. Oh wait! ...</div>
          </div>
        </div>
        {/* Typing Input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none"
          />
          <button className="ml-2 p-2 text-teal-500 hover:scale-110">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
