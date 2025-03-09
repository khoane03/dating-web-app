import { useState } from "react";
import SearchFilter from "./Search";

const SearchInfo = () => {
  const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async (filters) => {
      setLoading(true);
      setMessage("");
      setResults([]);

      try {

        console.log("Filters gửi đi:", filters);

        if (!filters || typeof filters !== "object") {
            throw new Error("Dữ liệu tìm kiếm không hợp lệ!");
        }
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "" && value !== "Tất cả") {
                queryParams.append(key, value);
            }
        });
        console.log("Query string gửi đi:", queryParams.toString());
        const response = await fetch(`http://localhost:3000/api/search?${queryParams.toString()}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Lỗi từ server");
        }
          const data = await response.json();
          console.log("Dữ liệu từ API:", data);
          if (Array.isArray(data.results) && data.results.length > 0) {
            setResults(data.results);
            } else {
                setMessage("Dữ liệu không hợp lệ từ server!");
                setResults([]);
            }
      } catch (error) {
        console.error("Lỗi khi gửi request:", error);
          setMessage("Lỗi kết nối server!");
      }

      setLoading(false);
  };

  return (
      <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
          {/* Sidebar  */}
          <div className="w-1/3">
              <SearchFilter onSearch={handleSearch} />
          </div>

          {/* Search Results  */}
          <div className="w-2/3 bg-white p-6 rounded-xl shadow-lg border">
              <h2 className="text-xl font-bold text-gray-700">Kết Quả Tìm Kiếm</h2>

              {/* {loading && <p>Đang tìm kiếm...</p>} */}
              {message && <p className="text-gray-500">{message}</p>}

              <div className="grid grid-cols-2 gap-4 mt-4">
              {results.length > 0 ? (
        <ul>
            {results.map((user) => (
                <li key={user.id}>
                     <h3 className="text-lg font-semibold">{user.full_name}, {user.age}</h3>
                    <p>Giới tính: {user.gender === "Nam" ? "Nam" : "Nữ"}</p>
                    <p>Nghề nghiệp: {user.occupation}</p>
                    <p>Khoảng cách: {user.distance ? user.distance.toFixed(2) : "N/A"} km</p>
                </li>
            ))}
        </ul>
    ) : (
        !message && <p>Không có kết quả nào.</p>
    )}
              </div>
          </div>
      </div>
  );
};

export default SearchInfo;