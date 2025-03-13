import { useState } from "react";
import SearchFilter from "./Search";
import ProfileLocation from './Location';
import { IoClose, IoStar, IoHeart, IoArrowRedo, IoRefresh } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
const SearchInfo = () => {
    const context = useOutletContext() || {}; 
    const { results = [], message = ""} = context;

//   const [results, setResults] = useState([]);
//   const [message, setMessage] = useState("");

//   const handleSearch = async (filters) => {
//       setLoading(true);
//       setMessage("");
//       setResults([]);

//       try {

//         console.log("Filters gửi đi:", filters);

//         if (!filters || typeof filters !== "object") {
//             throw new Error("Dữ liệu tìm kiếm không hợp lệ!");
//         }
//         const queryParams = new URLSearchParams();
//         Object.entries(filters).forEach(([key, value]) => {
//             if (value !== undefined && value !== null && value !== "" && value !== "Tất cả") {
//                 queryParams.append(key, value);
//             }
//         });
//         console.log("Query string gửi đi:", queryParams.toString());
//         const response = await fetch(`http://localhost:3000/api/search?${queryParams.toString()}`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
//         if (!response.ok) {
//             throw new Error("Lỗi từ server");
//         }
//           const data = await response.json();
//           console.log("Dữ liệu từ API:", data);
//           if (Array.isArray(data.results) && data.results.length > 0) {
//             setResults(data.results);
//             } else {
//                 setMessage("Dữ liệu không hợp lệ từ server!");
//                 setResults([]);
//             }
//       } catch (error) {
//         console.error("Lỗi khi gửi request:", error);
//           setMessage("Lỗi kết nối server!");
//       }

//       setLoading(false);
//   };

return (
      <div className="w-2/3  p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Kết Quả Tìm Kiếm</h2>

        {message && <p className="text-gray-500">{message}</p>}

        <div className="grid grid-cols-2 gap-30 mt-4">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.id}
                className="relative w-96 h-[600px] bg-black text-white rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Profile Image */}
                <div className="relative w-full h-full">
                  <img
                    src={user.avatar_url} 
                    alt={`${user.full_name}'s profile`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* User Info */}
                  <div className="absolute bottom-[80px] left-4 bg-transparent bg-opacity-50 p-4 rounded-lg">
                    <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
                    <h1 className="text-4xl font-bold text-black"> 
                      {user.full_name}, {user.age}
                    </h1>
                    <p className="text-sm text-black">Cách xa {user.distance ? user.distance.toFixed(2) : "N/A"} km</p> 
                    <p className="text-sm text-black">Nghề nghiệp: {user.occupation}</p>
                    <p className="text-sm text-black">Bio: {user.bio}</p>
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
            ))
          ) : (
            !message && <p>Không có kết quả nào.</p>
          )}
      </div>
    </div>
    
  );
};
export default SearchInfo;