
import { useState, useEffect } from "react";
import { calculationDistance, getLocation } from "../../service/location";

const Search = () => {
    const [gender, setGender] = useState("Nam");
    const [age, setAge] = useState(25);
    const [distance, setDistance] = useState(20);
    const [userLat, setUserLat] = useState(null);
    const [userLong, setUserLong] = useState(null);
    const [currentUser] = useState({
        id: "1",
        lat: null,
        long: null,
    });
    useEffect(() => {
        const getAddress = async () => {
            const { latitude, longitude } = await getLocation();
            console.log("Location:", latitude, longitude);
            setUserLat(latitude);
            setUserLong(longitude);
            const distances = await calculationDistance(latitude, longitude, 20.981950442359466, 105.81336955165872);
            console.log("Khoảng cách:", distances);
        };
        getAddress();
    }, []);

    const handleSearch = async () => {
        const filters = {
            gender: gender === "Tất cả" ? null : gender,
            age: age || "",
            distance: distance || "",
            userLat: userLat || "",
            userLong: userLong || "",
        };

        console.log("Filters gửi đi:", filters);

        // onSearch(filters);
    };

    return (

        <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-pink-300 overflow-y-auto scrollbar-left" style={{ maxHeight: 'calc(100vh - 150px)' }}>
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
                <input type="range" min="18" max="50" value={age} onChange={(e) => setAge(e.target.value)} className="w-full accent-pink-500" />
            </div>

            {/* Khoảng cách */}
            <div className="mt-4">
                <label className="font-semibold text-gray-700">Khoảng cách: {distance} km</label>
                <input type="range" min="2" max="50" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full accent-pink-500" />
            </div>

            <button onClick={handleSearch} className="w-full mt-4 p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 cursor-pointer">
                Tìm Kiếm
            </button>
        </div>

    );
};

export default Search;
