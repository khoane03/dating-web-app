import pool from "../config/dbConfig.js";
import axios from "axios";

export const searchUsers = async (keyword, id) => {
    try {
        if (keyword.age && !validateNumber(keyword.age)) {
            return {
                code: 400,
                message: "Tuổi phải là số!"
            };
        }
        if (keyword.distance && !validateNumber(keyword.distance)) {
            return {
                code: 400,
                message: "Khoảng cách phải là số!"
            };
        }
        const location = await getLocations(id);
        if (!location) {
            return {
                code: 404,
                message: "Bạn cần cập nhật vị trí!"
            };
        }

        let query = `SELECT id, full_name, avatar_url, latitude, longitude FROM tbl_users WHERE 1=1`;
        const queryParams = [];

        if (keyword.gender && keyword.gender !== "Tất cả") {
            queryParams.push(keyword.gender);
            query += ` AND gender = $${queryParams.length}`;
        }
        if (keyword.age) {
            queryParams.push(parseInt(keyword.age, 10));
            query += ` AND age <= $${queryParams.length}`;
        }

        const { rows } = await pool.query(query, queryParams);
       
        //tính khoảng cách từ user đến các user khác
        const filteredUsers = await Promise.all(rows.map(async (user) => {
            const currentDistance = await calculationDistance(
                location.latitude, location.longitude, user.latitude, user.longitude
            );
            return Number(currentDistance) <= Number(keyword.distance) ? { ...user, distance: currentDistance } : null;
        }));

        return {
            code: 200,
            message: "Kết quả tìm kiếm",
            data: filteredUsers.filter(user => user !== null)
        };
    } catch (error) {
        return {
            code: 500,
            message: "Lỗi server! Vui lòng thử lại sau."
        };
    }
};

const getLocations = async (id) => {
    try {
        const res = await pool.query("SELECT latitude, longitude FROM tbl_users WHERE acc_id = $1", [id]);
        if (res.rowCount === 0) return null;
        return res.rows[0];
    } catch (error) {
        console.error("Lỗi lấy vị trí:", error);
        return null;
    }
};

const validateNumber = (number) => {
    return !isNaN(parseFloat(number)) && isFinite(number);
};

const calculationDistance = async (lat1, lon1, lat2, lon2) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

    try {
        const res = await axios.get(url);
        return (res.data.routes[0].distance / 1000).toFixed(2); // Đơn vị km
    } catch (error) {
        console.error("Lỗi tính khoảng cách:", error);
        return null;
    }
};
