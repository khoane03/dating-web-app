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

    const handleSearch = async () => {
        try {
            setLoading(true);
            setResult([]);
            const res = await search(keyword);
            console.log("Kết quả tìm kiếm:", res.data);
            setResult(res.data);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300 overflow-y-auto scrollbar-left" >
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
                        onChange={(e) => setKeyword({ ...keyword, age: parseInt(e.target.value) })}
                        className="w-full accent-pink-500"
                    />
                </div>

                {/* Khoảng cách */}
                <div className="mt-4">
                    <label className="font-semibold text-gray-700">Khoảng cách: {keyword.distance} km</label>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={keyword.distance}
                        onChange={(e) => setKeyword({ ...keyword, distance: parseInt(e.target.value) })}
                        className="w-full accent-pink-500"
                    />
                </div>

                <button disabled={loading}
                    onClick={handleSearch}
                    className="w-full mt-4 p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 cursor-pointer" >
                    {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
                </button>
            </div>
            {result.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-70 border border-pink-300 overflow-hidden mt-2">
                    <h2 className="text-lg text-center font-bold text-pink-500">Kết quả</h2>
                    <div className="max-h-60 overflow-y-auto">
                        {result.map((user, index) => (
                            <NavLink to={`/search/${user.id}`} key={index} className="flex items-center space-x-2 mt-4 p-4 border-b border-gray-300 hover:bg-gray-100 hover:rounded-4xl">
                                <img src={user.avatar_url} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">{user.full_name}</h2>
                                    <p className="text-sm text-gray-500">Khoảng cách: {user.distance} km</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
};

export default Search;
