import React, { useState } from "react";
import axios from "axios";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Return distance rounded to 2 decimal places
  };

const ProfileLocation = ({ userId, currentUserLat, currentUserLong, targetLat, targetLong }) => {
  const [address, setAddress] = useState("");
  const [userLat, setUserLat] = useState(currentUserLat || null);
  const [userLong, setUserLong] = useState(currentUserLong || null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to get address from latitude and longitude
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

  // Function to calculate distance using OSRM
  const getDistanceFromOSM = async (lat1, lon1, lat2, lon2) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

    try {
      const res = await axios.get(url);
      const distanceInKm = res.data.routes[0].distance / 1000; // Convert meters to km
      setDistance(`${distanceInKm.toFixed(2)} km`);
      return distanceInKm;
    } catch (error) {
      console.error("Lỗi khi lấy khoảng cách:", error);
      setDistance("Không tìm thấy đường đi");
      return null;
    }
  };

  // Function to fetch a user's location
  const fetchUserLocation = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}/location`
      );
      return response.data; // Returns { latitude, longitude }
    } catch (error) {
      console.error(`Lỗi khi lấy vị trí của người dùng ${userId}:`, error);
      throw error;
    }
  };

  // Function to update location and calculate distance
  const updateLocation = async () => {
    setLoading(true);
    setError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLat = position.coords.latitude;
          const newLong = position.coords.longitude;

          // Get the new address using Nominatim API
          const newAddress = await getAddress(newLat, newLong);

          // Update the database with new latitude, longitude, and address
          if (newAddress && newLat && newLong) {
            try {
              const response = await axios.put(
                `http://localhost:3000/api/users/${userId}/location`,
                {
                  address: newAddress,
                  latitude: newLat,
                  longitude: newLong,
                }
              );

              if (response.status === 200) {
                // Update local state to reflect the new values
                setUserLat(newLat);
                setUserLong(newLong);
                setAddress(newAddress);
                console.log("Vị trí đã được cập nhật trong database:", {
                  latitude: newLat,
                  longitude: newLong,
                  address: newAddress,
                });

                // Calculate distance to target user if targetUserId is provided
                if (targetUserId) {
                  try {
                    const currentLocation = { latitude: newLat, longitude: newLong };
                    const targetLocation = await fetchUserLocation(targetUserId);

                    if (
                      currentLocation.latitude &&
                      currentLocation.longitude &&
                      targetLocation.latitude &&
                      targetLocation.longitude
                    ) {
                      const calculatedDistance = calculateDistance(
                        currentLocation.latitude,
                        currentLocation.longitude,
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
            } catch (error) {
              console.error("Lỗi khi gửi request:", error);
              if (error.code === "ERR_NETWORK") {
                setError("Không thể kết nối đến server. Vui lòng kiểm tra backend!");
              } else {
                setError(
                //   error.response?.data?.error || "Lỗi khi cập nhật vị trí"
                );
              }
            }
          } else {
            setError("Không thể lấy địa chỉ từ tọa độ mới");
          }
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
          setError("Không thể lấy vị trí");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation không được hỗ trợ bởi trình duyệt này.");
      setLoading(false);
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