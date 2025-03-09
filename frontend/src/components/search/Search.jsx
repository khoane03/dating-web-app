
import { useState, useEffect } from "react";

const hobbiesList = ["Âm nhạc", "Du lịch", "Thể thao", "Đọc sách", "Nấu ăn", "Chơi game", "Mỹ thuật", "Xem phim"];

const Search = ({ onSearch }) => {
    const [gender, setGender] = useState("Nam");
    const [age, setAge] = useState(25);
    const [distance, setDistance] = useState(20);
    const [hobbies, setHobbies] = useState([]);
    const [userLat, setUserLat] = useState(null);
    const [userLong, setUserLong] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLong(position.coords.longitude);
                    console.log("Vị trí người dùng:", position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Lỗi khi lấy vị trí:", error);
                }
            );
        } else {
            console.error("Geolocation không được hỗ trợ bởi trình duyệt này.");
        }
    }, []);

    const toggleHobby = (hobby) => {
        setHobbies((prev) =>
          prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
        );
      };
    const handleSearch = async () => {
      const filters = {
          gender: gender, 
          age: age || "", 
          distance: distance || "",
          userLat: userLat || "",
          userLong: userLong || "",
      };
  
      console.log("Filters gửi đi:", filters); 
  
      onSearch(filters);
    };
  
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300">
        <h2 className="text-lg font-bold text-pink-500">Bộ Lọc Tìm Kiếm</h2>
        {/* Giới tính */}
        <div className="mt-4">
            <label className="font-semibold text-gray-700">Giới tính</label>
            <select className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Tất cả">Tất cả</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
        </div>
  
        {/* Độ tuổi */}
        <div className="mt-4">
            <label className="font-semibold text-gray-700">Độ tuổi: {age}+</label>
            <input type="range" min="18" max="50" value={age} onChange={(e) => setAge(e.target.value)} className="w-full accent-pink-500"/>
        </div>
  
        {/* Khoảng cách */}
        <div className="mt-4">
            <label className="font-semibold text-gray-700">Khoảng cách: {distance} km</label>
            <input type="range" min="2" max="50" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full accent-pink-500"/>
        </div>

        {/* Sở thích */}
        <div className="mt-4">
            <label className="font-semibold text-gray-700">Sở thích</label>
            <div className="grid grid-cols-2 gap-2 mt-2"> {hobbiesList.map((hobby) => (
            <button key={hobby} className={`p-2 text-sm rounded border transition ${hobbies.includes(hobby) ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => toggleHobby(hobby)}>
                {hobby}
            </button>
            ))}
            </div>
        </div>
        
        {/* Nút Tìm Kiếm */}
            <button onClick={handleSearch} className="w-full mt-4 p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 cursor-pointer">
                Tìm Kiếm
            </button>
        </div>
        
    );
};

export default Search;
