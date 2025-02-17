import React, { useState } from "react";

const allUsers = [
  { id: 1, name: "Hằng", age: 25, distance: 2.5, avatar: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg" },
  { id: 2, name: "Hùng", age: 27, distance: 5.3, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s" },
  { id: 3, name: "My", age: 23, distance: 1.2, avatar: "https://as1.ftcdn.net/jpg/01/16/24/44/1000_F_116244459_pywR1e0T3H7FPk3LTMjG6jsL3UchDpht.jpg" },
  { id: 4, name: "Mạnh", age: 30, distance: 10.0, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeyKsVv8iDGr6Q3LF9tIdyY_dOi79dqJKjIw&s" },
];

function Search() {
  const [maxDistance, setMaxDistance] = useState(10);
  const filteredUsers = allUsers.filter(user => user.distance <= maxDistance);
  return (
    <div style={{ padding: "100px", margin: " 10px 50px", backgroundColor: "pink", borderRadius: "10%" }}>
    <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Người gần bạn</h1>
      
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={maxDistance} 
          onChange={(e) => setMaxDistance(e.target.value)} 
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: "14px", color: "gray" }}>{maxDistance} km</span>
      </div>

      <div>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", border: "1px solid #ddd", borderRadius: "12px", marginBottom: "8px", background: "white", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
            <img src={user.avatar} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid pink" }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{user.name}, {user.age} tuổi</h2>
              <p style={{ fontSize: "14px", color: "gray", margin: 0 }}>{user.distance} km</p>
            </div>
            <button style={{ background: "pink", color: "white", border: "none", padding: "8px", borderRadius: "50%", cursor: "pointer", transition: "transform 0.2s, background 0.2s" }} 
            onMouseOver={(e) => { e.target.style.transform = "scale(1.2)"; e.target.style.background = "#ff69b4"; }}
            onMouseOut={(e) => { e.target.style.transform = "scale(1)"; e.target.style.background = "pink"; }}>❤️</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Search;
