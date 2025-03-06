import React from "react";
import { IoClose, IoStar, IoHeart, IoArrowRedo, IoRefresh } from "react-icons/io5";
import Reactions from "../reaction/Reactions"; 

const Tinder = ({ postId, userId }) => {
  return (
    <div className="relative w-96 h-[700px] bg-black text-white rounded-2xl overflow-hidden shadow-2xl">
    {/* Profile Image */}
    <div className="relative w-full h-full">
      <img
        src="/Hinh 2.png"
        alt="Profile"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* User Info */}
      <div className="absolute bottom-[80px] left-4 bg-transparent bg-opacity-50 p-4 rounded-lg">
        <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
        <h1 className="text-4xl font-bold">Vie, 19</h1>
        <p className="text-sm">Cách xa 8 km</p>
      </div>
      {/* Action Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
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
    </div>
  </div>
  );
};

export default Tinder;
