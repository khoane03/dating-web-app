import React, { useEffect, useState } from "react";
import { getAddress, getAddressByUserLogin, getLocation, updateLocationUser } from "../../service/location";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Đổi sang Km
  return distance.toFixed(2);
};

const ProfileLocation = ({ userId, currentUserLat, currentUserLong, targetLat, targetLong }) => {
  const [address, setAddress] = useState("");
  const [userLat, setUserLat] = useState(currentUserLat || null);
  const [userLong, setUserLong] = useState(currentUserLong || null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressOld, setAddressOld] = useState([]);

  // Hàm cập nhật vị trí 
  const updateLocation = async () => {
    setLoading(true);
    setError("");
    try {
      const { latitude, longitude } = await getLocation();
      const newAdd = await getAddress(latitude, longitude);
      await updateLocationUser(newAdd, latitude, longitude);
    } catch (error) {
      setError("Lỗi khi cập nhật vị trí: " + error.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAddressByUserLogin();
        setAddressOld(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ:", error);
      }
    };
    fetchData();

  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-pink-500 mb-2">Vị trí của bạn</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <p>Địa chỉ hiện tại: {address || addressOld.address}</p>
      <p>Vĩ độ: {userLat || addressOld.latitude}</p>
      <p>Kinh độ: {userLong || addressOld.longitude}</p>
      {/* <p>Khoảng cách: {distance || ""}</p> */}
      <button
        onClick={updateLocation}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Đang cập nhật..." : "Cập nhật vị trí"}
      </button>
    </div>
  );
};

export default ProfileLocation;