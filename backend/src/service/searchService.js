import pool from "../config/dbConfig.js";
import axios from "axios";

export const searchUsers = async (keyword, id) => {
    try {
        if (keyword.age && !validateNumber(keyword.age)) {
            return { code: 400, message: "Tuổi phải là số!" };
        }
        if (keyword.distance && !validateNumber(keyword.distance)) {
            return { code: 400, message: "Khoảng cách phải là số!" };
        }
        const location = await getLocations(id);
        if (!location) {
            return { code: 404, message: "Bạn cần cập nhật vị trí!" };
        }

        let query = `
            SELECT id, full_name, avatar_url, latitude, longitude,
                   ROUND((6371 * acos(cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) + sin(radians($1)) * sin(radians(latitude))))::numeric, 2) AS distance
            FROM tbl_users
            WHERE 1=1`;
        const queryParams = [location.latitude, location.longitude];

        if (keyword.gender && keyword.gender !== "Tất cả") {
            queryParams.push(keyword.gender);
            query += ` AND gender = $${queryParams.length}`;
        }
        if (keyword.age) {
            queryParams.push(parseInt(keyword.age, 10));
            query += ` AND age <= $${queryParams.length}`;
        }
        if (keyword.distance) {
            queryParams.push(parseInt(keyword.distance, 10));
            query += ` AND (6371 * acos(cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) + sin(radians($1)) * sin(radians(latitude)))) <= $${queryParams.length}`;
        }

        const { rows } = await pool.query(query, queryParams);

        return {
            code: 200,
            message: "Kết quả tìm kiếm",
            data: rows
        };
    } catch (error) {
        return { code: 500, message: "Lỗi server! Vui lòng thử lại sau." };
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

