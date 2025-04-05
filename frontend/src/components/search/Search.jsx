import { useState } from "react";
import { search } from "../../service/searchService";
import { NavLink } from "react-router-dom";

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState({
        gender: "Tất cả",
        age: 1,
        distance: 1,
    });
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false); // Kiểm soát hiển thị kết quả

    const handleSearch = async () => {
        try {
            setLoading(true);
            if (keyword.age < 18) {
                setError("Độ tuổi phải lớn hơn hoặc bằng 18");
                return;
            }
            setResult([]);
            const res = await search(keyword);
            console.log("Kết quả tìm kiếm:", res.data);
            setResult(res.data);
            setShowResults(true); // Hiện kết quả sau khi tìm kiếm
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Bộ lọc tìm kiếm */}
            {!showResults && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300">
                    <h2 className="text-lg text-center font-bold text-pink-500">Bộ Lọc Tìm Kiếm</h2>

                    {/* Giới tính */}
                    <div className="mt-4">
                        <label className="font-semibold text-gray-700">Giới tính</label>
                        <select
                            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            value={keyword.gender}
                            onChange={(e) => setKeyword({ ...keyword, gender: e.target.value })}
                        >
                            <option value="Tất cả">Tất cả</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>

                    {/* Độ tuổi */}
                    <div className="mt-4">
                        <label className="font-semibold text-gray-700">Độ tuổi: {keyword.age}+</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={keyword.age}
                            onChange={(e) => {
                                setKeyword({ ...keyword, age: parseInt(e.target.value) });
                                setError(null);
                            }}
                            className="w-full accent-pink-500"
                        />
                    </div>

                    {/* Khoảng cách */}
                    <div className="mt-4">
                        <label className="font-semibold text-gray-700">Khoảng cách: {keyword.distance} km</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={keyword.distance}
                            onChange={(e) => setKeyword({ ...keyword, distance: parseInt(e.target.value) })}
                            className="w-full accent-pink-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        disabled={loading}
                        onClick={handleSearch}
                        className="w-full mt-4 p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 cursor-pointer"
                    >
                        {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
                    </button>
                </div>
            )}

            {/* Hiển thị kết quả + Nút tìm kiếm lại */}
            {showResults && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300">
                    <h2 className="text-xl font-semibold text-pink-500 mb-2 text-center">Kết quả: {result.length}</h2>

                    <div className="bg-gray-100 w-full rounded-lg p-3 text-center">
                        <ul className="text-gray-700 space-y-1">
                            <li><span className="font-medium text-gray-900">Giới tính:</span> {keyword.gender || "Không có"}</li>
                            <li><span className="font-medium text-gray-900">Tuổi:</span> {keyword.age || "Không có"}</li>
                            <li><span className="font-medium text-gray-900">Khoảng cách:</span> {keyword.distance || "Không có"} km</li>
                        </ul>
                    </div>

                    {/* Danh sách kết quả */}
                    <div className="max-h-60 overflow-y-auto mt-4">
                        {result.map((user, index) => (
                            <NavLink
                                to={`/search/${user.id}`}
                                key={index}
                                className="flex items-center space-x-2 p-4 border-b border-gray-300 hover:bg-gray-100 rounded-lg transition duration-300"
                            >
                                <img src={user.avatar_url} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">{user.full_name}</h2>
                                    <p className="text-sm text-gray-500">Khoảng cách: {user.distance} km</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    {/* Nút "Tìm kiếm lại" */}
                    <button
                        onClick={() => setShowResults(false)}
                        className="w-full mt-4 p-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 cursor-pointer"
                    >
                        Tìm kiếm lại
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;
