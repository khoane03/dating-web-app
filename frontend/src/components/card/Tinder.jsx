import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { IoClose, IoHeart, IoStar, IoArrowRedo, IoRefresh } from "react-icons/io5";

// Danh sách hồ sơ mẫu
const profiles = [
  { id: 1, name: "Vie, 19", distance: "Cách xa 8 km", image: "/hinh1.png" },
  { id: 2, name: "Anna, 21", distance: "Cách xa 5 km", image: "/hinh2.png" },
  { id: 3, name: "Linh, 22", distance: "Cách xa 3 km", image: "/hinh3.png" },
];

const TinderSwipe = () => {
  // State để theo dõi chỉ số hồ sơ hiện tại (bắt đầu từ hồ sơ cuối cùng)
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  
  // useRef để lưu trữ tham chiếu đến các thẻ TinderCard
  const cardRefs = useRef([]);

  // Hàm xử lý khi người dùng vuốt (hiển thị trong console)
  const swiped = (direction, index) => {
    console.log(`Đã vuốt ${direction} vào ${profiles[index].name}`);
  };

  // Hàm xử lý khi nhấn nút thao tác (trái/phải)
  const handleSwipe = (direction) => {
    if (direction === "right") {
      // Chuyển sang hồ sơ tiếp theo nếu còn
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (direction === "left") {
      // Quay lại hồ sơ trước đó nếu còn
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-96 h-[700px]">
        {/* Hiển thị danh sách hồ sơ */}
        {profiles.map((profile, index) => (
          <TinderCard
            key={profile.id}
            ref={(el) => (cardRefs.current[index] = el)} // Lưu tham chiếu vào useRef
            onSwipe={(dir) => swiped(dir, index)} // Gọi hàm khi vuốt
            preventSwipe={["up", "down"]} // Chặn vuốt lên/xuống
            className={`absolute w-full h-full ${index === currentIndex ? "" : "hidden"}`} // Chỉ hiển thị hồ sơ hiện tại
          >
            <div className="relative w-full h-full bg-black text-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Hình ảnh hồ sơ */}
              <img
                src={profile.image}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Thông tin hồ sơ */}
              <div className="absolute bottom-[80px] left-4 bg-transparent bg-opacity-50 p-4 rounded-lg">
                <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
                <h1 className="text-4xl font-bold">{profile.name}</h1>
                <p className="text-sm">{profile.distance}</p>
              </div>

              {/* Các nút thao tác */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {/* Nút từ chối */}
                <button
                  onClick={() => handleSwipe("left")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoClose className="text-red-500" size={28} />
                </button>
                {/* Nút thích */}
                <button
                  onClick={() => handleSwipe("right")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoHeart className="text-green-500" size={28} />
                </button>
                {/* Nút ưu tiên (siêu like) */}
                <button
                  onClick={() => handleSwipe("up")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoStar className="text-blue-500" size={28} />
                </button>
                {/* Nút chia sẻ */}
                <button
                  onClick={() => handleSwipe("down")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoArrowRedo className="text-blue-400" size={28} />
                </button>
                {/* Nút làm mới */}
                <button
                  onClick={() => handleSwipe("right")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoRefresh className="text-yellow-500" size={28} />
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default TinderSwipe;
