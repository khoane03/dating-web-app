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

const calculationDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính Trái Đất (km)
    const toRad = (value) => (value * Math.PI) / 180; // Chuyển độ sang radian

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Khoảng cách (km)

    return `${distance.toFixed(2)} km`;
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