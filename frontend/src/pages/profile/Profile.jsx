import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoThumbsUp, IoHeart, IoHappy, IoSad } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-80 h-[500px] bg-white rounded-3xl overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative w-full h-3/4 bg-cover bg-center" style={{ backgroundImage: "url('https://scontent.fhan5-7.fna.fbcdn.net/v/t39.30808-1/311442817_427444946211076_7736417347297858309_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeEuRAdBoOVL-K9qBa-nUQLauGbmqgzLek64ZuaqDMt6TkQ3v0MVFIZx4TjhbrBaszCnBLNbnfEPaGlm0XPeVP9H&_nc_ohc=WTyXAV8Z73MQ7kNvgEt-646&_nc_oc=AdgIekJjxW724X89RRJZ4pbowX8AiH7ahqAwSpVYEOYh_c9APJOL2MMT9Wkb4yItAD0&_nc_zt=24&_nc_ht=scontent.fhan5-7.fna&_nc_gid=AaH_xjDtXhjlvBQCxcxpKFL&oh=00_AYBREqSlJTypuv-b61U0OIdA5xL-my6thUyDVwHjae5vgA&oe=67B895F7')" }}>
          <img src="https://scontent.fhan5-7.fna.fbcdn.net/v/t39.30808-1/311442817_427444946211076_7736417347297858309_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeEuRAdBoOVL-K9qBa-nUQLauGbmqgzLek64ZuaqDMt6TkQ3v0MVFIZx4TjhbrBaszCnBLNbnfEPaGlm0XPeVP9H&_nc_ohc=WTyXAV8Z73MQ7kNvgEt-646&_nc_oc=AdgIekJjxW724X89RRJZ4pbowX8AiH7ahqAwSpVYEOYh_c9APJOL2MMT9Wkb4yItAD0&_nc_zt=24&_nc_ht=scontent.fhan5-7.fna&_nc_gid=AaH_xjDtXhjlvBQCxcxpKFL&oh=00_AYBREqSlJTypuv-b61U0OIdA5xL-my6thUyDVwHjae5vgA&oe=67B895F7" alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Liz, 18 <FaCheckCircle className="text-blue-500" />
            </h1>
            <p className="text-sm">AnimeAnime</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-4 w-full flex justify-around px-4">
          <button className="p-4 bg-blue-500 text-white rounded-full shadow-md">
            <IoThumbsUp size={24} />
          </button>
          <button className="p-4 bg-red-500 text-white rounded-full shadow-md">
            <IoHeart size={24} />
          </button>
          <button className="p-4 bg-yellow-400 text-white rounded-full shadow-md">
            <IoHappy size={24} />
          </button>
          <button className="p-4 bg-orange-600 text-white rounded-full shadow-md">
            <IoSad size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
