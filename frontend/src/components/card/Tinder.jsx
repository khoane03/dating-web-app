import React, { useState, useEffect } from "react";
import { IoClose, IoHeart, IoRefresh } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrin } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "../../service/postService";

const TinderSwipe = () => {
  const [groupedPosts, setGroupedPosts] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState({});

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

  if (groupedPosts.length === 0) {
    return <div className="text-white text-center">Đang tải...</div>;
  }

  const profile = groupedPosts[currentUserIndex];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[400px] h-[600px]">
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
                <FaArrowLeft className="text-3xl text-white hover:text-gray-200" />
              </button>
              <button onClick={() => handleButton(profile.user_id, "next")}>
                <FaArrowRight className="text-3xl text-white hover:text-gray-200" />
              </button>
            </div>
          )}

          {/* Thông tin hồ sơ */}
          <div className="absolute bottom-[80px] left-4 bg-transparent bg-opacity-50 p-4 rounded-lg">
            <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
            <Link to={`/profile/${profile.user_id}`}>
              <h1 className="text-4xl font-bold">{profile.full_name}</h1>
            </Link>
          </div>

          {/* Các nút thao tác */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button className="p-3 bg-gray-700 rounded-full">
              <IoRefresh className="text-yellow-500" size={28} />
            </button>
            <button className="p-3 bg-gray-700 rounded-full">
              <IoHeart onClick={() => handleMatch(profile.user_id)} className="text-green-500" size={28} />
            </button>
            <button className="p-3 bg-gray-700 rounded-full">
              <FontAwesomeIcon icon={faFaceGrin} className="text-blue-500 w-8 h-8 text-2xl" />
            </button>
            <button onClick={handleNextUser} className="p-3 bg-gray-700 rounded-full">
              <IoClose className="text-red-500" size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TinderSwipe;
