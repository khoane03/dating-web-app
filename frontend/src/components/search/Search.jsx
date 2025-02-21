import React, { useState } from "react";

const profiles = [
  { name: "Hằng", age: 26, img: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg"},
  { name: "Hùng", age: 33, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s"},
  { name: "My", age: 33, img: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg"},
  { name: "Hùng", age: 26, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s"},
  { name: "My", age: 27, img: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg"},
  { name: "Hùng", age: 28, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s"},
  { name: "My", age: 31, img: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg"},
  { name: "Hùng", age: 27, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s"},
  { name: "My", age: 31, img: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg"},
];

const chatRequests = [
  { name: "Long", message: "muốn mời bạn để làm quen..."},
  { name: "Long", message: "muốn mời bạn để làm quen..."},
  { name: "Long", message: "muốn mời bạn để làm quen..."},
];
 
function Search() {
  const [searchModal, setSearchModal] = useState(false);
  const [distance, setDistance] = useState(21);
  const [age, setAge] = useState(25);

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      {/*Thanh Navbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold"><i class="fa-solid fa-heart"></i> Dating</h1>
        <div className="flex gap-4">
          <button className="cursor-pointer" onClick={() => setSearchModal(true)}><i class="fa-solid fa-magnifying-glass"></i></button>
          <button className="cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded">Nâng cấp tài khoản</button>
        </div>
      </div>

      
      {searchModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Cài đặt tìm kiếm</h2>
              <button className="cursor-pointer" onClick={() => setSearchModal(false)}><i class="fa-solid fa-circle-xmark"></i></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Địa điểm</label>
                <input type="text" placeholder="Nhập địa điểm" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="font-semibold">Khoảng cách Tối đa: {distance} km</label>
                <input type="range" min="2" max="50" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full" />
              </div>
              <div>
                <label className="font-semibold">Độ tuổi Tối đa: {age} tuổi</label>
                <input type="range" min="18" max="50" value={age} onChange={(e) => setAge(e.target.value)} className="w-full" />
              </div>
              <div>
                <button className="w-full bg-blue-500 text-white p-2 rounded" onMouseOver={(e) => { e.target.style.transform = "scale(1.1)"; e.target.style.background = "#ff69b4"; }}
            onMouseOut={(e) => { e.target.style.transform = "scale(1)"; e.target.style.background = "pink"; }}>Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.map((profile, index) => (
            <div key={index} className="relative bg-white rounded shadow p-2">
              <img src={profile.img} alt={profile.name} className="w-full h-40 object-cover rounded-t" />

              <div className="p-2">
                <h3 className="font-bold">{profile.name}, {profile.age} tuổi</h3>
              </div>
            </div>
          ))}
        </div>

      
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Yêu cầu làm quen</h2>
          {chatRequests.map((chat, index) => (
            <div key={index} className="flex items-center gap-2 mt-2 border-b pb-2">
              <span className="w-8 h-8 text-gray-500"><i class="fa-regular fa-face-smile"></i></span>
              <div>
                <p className="font-bold">{chat.name}</p>
                <p className="text-sm text-gray-500">{chat.message}</p>
              </div>
              <button style={{ background: "pink", color: "white", border: "none", padding: "8px", borderRadius: "50%", cursor: "pointer", transition: "transform 0.2s, background 0.2s" }} 
            onMouseOver={(e) => { e.target.style.transform = "scale(1.2)"; e.target.style.background = "#ff69b4"; }}
            onMouseOut={(e) => { e.target.style.transform = "scale(1)"; e.target.style.background = "pink"; }}>❤️</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>Search</p>
        <button></button>
      </div>
    </div>
  );

}

export default Search;
