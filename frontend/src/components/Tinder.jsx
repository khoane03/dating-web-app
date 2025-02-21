import React from "react";
import { IoClose, IoStar, IoHeart, IoArrowRedo, IoRefresh } from "react-icons/io5";
import Reactions from "./reaction/Reactions"; // Import Reactions component

const Tinder = ({ postId, userId }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      {/* Thẻ hiển thị thông tin người dùng */}
      <div className="relative w-80 bg-black text-white rounded-2xl overflow-hidden shadow-lg">
        {/* Profile Image */}
        <div className="relative">
          <img
            src="/Hinh 2.png"
            alt="Profile"
            className="w-full h-96 object-cover"
          />
          {/*thông tin người dùng */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
            <h1 className="text-2xl font-bold">Vie, 19</h1>
            <p className="text-sm">Cách xa 8 km</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around p-4 bg-black">
          <button className="p-3 bg-gray-700 rounded-full">
            <IoRefresh className="text-yellow-500" size={28} />
          </button>
          <button className="p-3 bg-gray-700 rounded-full">
            <IoClose className="text-red-500" size={28} />
          </button>
          <button className="p-3 bg-gray-700 rounded-full">
            <IoStar className="text-blue-500" size={28} />
          </button>
          <button className="p-3 bg-gray-700 rounded-full">
            <IoHeart className="text-green-500" size={28} />
          </button>
          <button className="p-3 bg-gray-700 rounded-full">
            <IoArrowRedo className="text-blue-400" size={28} />
          </button>
        </div>

        {/* hiện thị phản ứng  */}
        <div className="p-4">
          <Reactions postId={postId} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Tinder;
