import { axiosService } from "./axiosService";
import axios from "axios";

const getAddress = async (lat, lng) => {
    try {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const address = res.data.display_name;
        return address;
    } catch (error) {
        console.error("Lỗi khi lấy địa chỉ:", error);
    }
};

const getLocation = async () => {
    if (!navigator.geolocation) {
        throw new Error("Geolocation không được hỗ trợ bởi trình duyệt này.");
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
        );
    });
};

const calculationDistance = async (lat1, lon1, lat2, lon2) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

    try {
      const res = await axios.get(url);
      const distance = res.data.routes[0].distance / 1000; // Chuyển mét sang km
      return `${distance.toFixed(2)} km`;
    } catch (error) {
      console.error("Lỗi khi lấy khoảng cách:", error);
      return "Không tìm thấy đường đi";
    } 
};



const updateLocationUser = async (address, latitude, longitude) => {
    return await axiosService.put("/location", {
        address,
        latitude,
        longitude,
    });
};

const getAddressByUserLogin = async () => {
    return await axiosService.get("/location");
}

export {
    updateLocationUser,
    getLocation,
    getAddress,
    getAddressByUserLogin,
    calculationDistance
};