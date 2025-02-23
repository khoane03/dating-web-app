import React, { useState } from "react";

const hobbiesList = [
  "Âm nhạc", "Du lịch", "Thể thao", "Đọc sách", "Nấu ăn", "Chơi game", "Mỹ thuật", "Xem phim"
];

const Search = ({ onFilter }) => {
  const [gender, setGender] = useState("all");
  const [age, setAge] = useState(25);
  const [distance, setDistance] = useState(20);
  const [hobbies, setHobbies] = useState([]);

  const toggleHobby = (hobby) => {
    setHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleApplyFilter = () => {
    onFilter({ gender, age, distance, hobbies });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300">
      <h2 className="text-lg font-bold text-pink-500">🔍 Bộ Lọc Tìm Kiếm</h2>

      {/* Giới tính */}
      <div className="mt-4">
        <label className="font-semibold text-gray-700">Giới tính</label>
        <select
          className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
      </div>

      {/* Độ tuổi */}
      <div className="mt-4">
        <label className="font-semibold text-gray-700">Độ tuổi: {age}+</label>
        <input
          type="range"
          min="18"
          max="50"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
      </div>

      {/* Khoảng cách */}
      <div className="mt-4">
        <label className="font-semibold text-gray-700">Khoảng cách: {distance} km</label>
        <input
          type="range"
          min="2"
          max="50"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
      </div>

      {/* Sở thích */}
      <div className="mt-4">
        <label className="font-semibold text-gray-700">Sở thích</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {hobbiesList.map((hobby) => (
            <button
              key={hobby}
              className={`p-2 text-sm rounded border transition ${
                hobbies.includes(hobby) ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => toggleHobby(hobby)}
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>

      {/* Nút Tìm Kiếm */}
      <button
        onClick={handleApplyFilter}
        className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded transition-transform transform hover:scale-105"
      >
        🎯 Tìm Kiếm
      </button>
    </div>
  );
};
export default Search;
