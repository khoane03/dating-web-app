import React, { useState } from "react";
import axios from "axios";

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

  // Hàm lấy địa chỉ từ kinh độ và vĩ độ
  const getAddress = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const newAddress = res.data.display_name || "Không tìm thấy địa chỉ";
      setAddress(newAddress);
      return newAddress;
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      setAddress("Lỗi khi lấy địa chỉ");
      return null;
    }
  };
 
  // Hàm lấy kinh độ và vĩ độ
  const getLocation = (setUserLat, setUserLong, setError) => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords; // Corrected typo from 'longtitude' to 'longitude'
            console.log("Vị trí hiện tại:", latitude, longitude);
            setUserLat(latitude);
            setUserLong(longitude);
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Lỗi khi lấy vị trí:", error);
            setError("Lỗi khi lấy vị trí: " + error.message);
            reject(error);
          }
        );
      } else {
        console.error("Geolocation không hỗ trợ trình duyệt này");
        setError("Geolocation không được hỗ trợ bởi trình duyệt này.");
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  

  // Hàm cập nhật vị trí và tính khoảng cách
  const updateLocation = async () => {
    setLoading(true);
    setError("");

    try {
      
      const locationData = await getLocation(setUserLat, setUserLong, setError);

      if (locationData.latitude && locationData.longitude) {
        const newAddress = await getAddress(locationData.latitude, locationData.longitude, setAddress);

        if (newAddress && locationData.latitude && locationData.longitude) {
          const response = await axios.put(
            `http://localhost:3000/api/users/${userId}/location`,
            {
              address: newAddress,
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            }
          );

          if (response.status === 200) {
            // Update local state and parent component state
            setUserLat(locationData.latitude);
            setUserLong(locationData.longitude);
            setCurrentUser((prev) => ({
              ...prev,
              lat: locationData.latitude,
              long: locationData.longitude,
            }));
            console.log("Vị trí đã được cập nhật trong database:", {
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              address: newAddress,
            });

            // Tính khoảng cách khi xác nhận id
            if (targetUserId) {
              try {
                const targetLocation = await fetchUserLocation(targetUserId);

                if (
                  locationData.latitude &&
                  locationData.longitude &&
                  targetLocation.latitude &&
                  targetLocation.longitude
                ) {
                  const calculatedDistance = calculateDistance(
                    locationData.latitude,
                    locationData.longitude,
                    targetLocation.latitude,
                    targetLocation.longitude
                  );
                  setDistance(`${calculatedDistance} km`);
                } else {
                  setDistance("Không đủ dữ liệu để tính khoảng cách");
                }
              } catch (error) {
                setDistance("Lỗi khi lấy vị trí người dùng mục tiêu");
              }
            } else {
              setDistance("Không có người dùng mục tiêu để tính khoảng cách");
            }
          }
        } else {
          setError("Không thể lấy địa chỉ từ tọa độ mới");
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật vị trí:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra backend!");
      } else {
        // setError("Lỗi khi cập nhật vị trí");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-pink-500 mb-2">Vị trí của bạn</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <p>Địa chỉ hiện tại: {address || "Chưa cập nhật"}</p>
      <p>Vĩ độ: {userLat || "Chưa cập nhật"}</p>
      <p>Kinh độ: {userLong || "Chưa cập nhật"}</p>
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