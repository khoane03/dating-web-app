import React, { useState, useEffect } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoHeart,
  IoPeople,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrin } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "../../service/postService";
import Reactions from "../reaction/Reactions";
import { getUserLogin } from "../../service/userService";

const TinderSwipe = () => {
  const [groupedPosts, setGroupedPosts] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState({});
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  const handleMatch = (userId) => {
    console.log("Liked user:", userId);
    try {

    } catch (error) {
      console.error("API Error:", error);

    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUserLogin();
        setAvatar(data.data.avatar_url);

        const res = await getAllPosts();

        // Gộp các bài đăng theo user_id
        const grouped = Object.values(
          res.data.reduce((acc, post) => {
            if (!acc[post.user_id]) {
              acc[post.user_id] = { user_id: post.user_id, full_name: post.full_name, images: [] };
            }
            acc[post.user_id].images.push(post.image_url);
            return acc;
          }, {})
        );

        setGroupedPosts(grouped);

        // Khởi tạo state currentIndex cho từng user
        const initialIndex = grouped.reduce((acc, user) => {
          acc[user.user_id] = 0;
          return acc;
        }, {});
        setCurrentIndex(initialIndex);
      } catch (error) {
        console.error("API Error:", error);
      }

      setTimeout(() => {
        setLoading(false);
      }, 5000);
    };

    fetchPosts();
  }, []);

  const handleButton = (userId, direction) => {
    setCurrentIndex((prev) => {
      const totalImages = groupedPosts.find((user) => user.user_id === userId)?.images.length || 0;
      let newIndex = prev[userId];

      if (direction === "prev") {
        newIndex = newIndex > 0 ? newIndex - 1 : totalImages - 1;
      } else if (direction === "next") {
        newIndex = newIndex < totalImages - 1 ? newIndex + 1 : 0;
      }

      return { ...prev, [userId]: newIndex };
    });
  };

  // Chuyển sang người tiếp theo
  const handleNextUser = () => {
    setCurrentUserIndex((prev) => (prev < groupedPosts.length - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return (
      <div className="relative w-28 h-28 flex justify-center items-center">
        <div className="absolute inset-0 flex justify-center items-center border-2 bg-pink-400 border-pink-600 duration-1000 rounded-full animate-ping w-28 h-28">
        </div>
        <img className="rounded-full w-24 h-24 border-2 border-gray-300" src={avatar} alt="" />
      </div>
    );
  }

  if (groupedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center text-2xl">Không có dữ liệu</div>
      </div>
    );
  }

  const profile = groupedPosts[currentUserIndex];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[400px] h-[90%] border-2 border-gray-800 rounded-2xl overflow-hidden">
        <div key={profile.user_id} className="relative group w-full h-full bg-black text-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Hiển thị ảnh theo `currentIndex[user_id]` */}
          <img
            src={profile.images[currentIndex[profile.user_id]]}
            alt="Hồ sơ"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Thanh điều hướng ảnh */}
          {profile.images.length > 1 &&
            <div className="mt-2 flex justify-center w-full h-2 bg-[#434B54] rounded-3xl px-2 absolute top-2">
              {profile.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex((prev) => ({ ...prev, [profile.user_id]: index }))}
                  className={`w-full h-2 border rounded-3xl mx-1 transition ${currentIndex[profile.user_id] === index ? "bg-white" : "bg-gray-500 hover:bg-white"}`}
                />
              ))}
            </div>
          }

          {/* Nút điều hướng ảnh */}
          {profile.images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 group-hover:flex">
              <button onClick={() => handleButton(profile.user_id, "prev")}>
                <FaArrowLeft className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
              </button>
              <button onClick={() => handleButton(profile.user_id, "next")}>
                <FaArrowRight className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
              </button>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 rounded-2xl text-green-600 backdrop-blur-sm z-[1000]">
            {/* Thông tin hồ sơ */}
            <div className="p-4 opacity-100">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mx-4">Gần xung quanh</span>
              <Link to={`/profile/${profile.user_id}`}>
                <h1 className="text-4xl font-bold m-2 hover:text-pink-400 ">{profile.full_name}</h1>
              </Link>
            </div>

            {/* Các nút thao tác */}
            <div className="flex justify-around py-4">
              <button className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform transform">
                <IoArrowBack className="text-yellow-500" size={28} />
              </button>
              <button className="p-3 bg-gray-700 rounded-full hover:scale-125 transition-transform transform">
                <IoHeart onClick={() => handleMatch(profile.user_id)} className="text-green-500" size={28} />
              </button>
              <div className="relative group/reactions">
                <button className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform transform flex items-center">
                  10 <FontAwesomeIcon icon={faFaceGrin} className="text-blue-500 w-8 h-8 text-2xl" />
                </button>
                <div className='absolute -top-12 transform -translate-x-1/4 hidden group-hover/reactions:flex'>
                  <Reactions />
                </div>

              </div>
              <button onClick={handleNextUser} className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform transform">
                <IoArrowForward className="text-red-500" size={28} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TinderSwipe;
