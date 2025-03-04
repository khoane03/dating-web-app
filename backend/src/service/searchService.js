import pool from "../config/dbConfig.js";

export const searchUsers = async ({ age, gender, distance, userLat, userLoong}) => {
    try {
        let query = `SELECT * FROM tbl_users WHERE 1=1`;

        const queryParams = [];
        if (gender && gender !== "Tất cả") {
            queryParams.push(gender);
            query += ` AND gender = $${queryParams.length}`;
        }
        if (age) {
            queryParams.push(age);
            query += ` AND age <= $${queryParams.length}`;
        }
        if (userLat && userLong) {
            queryParams.push(userLat, userLong);
            if (distance) {
                queryParams.push(distance);
                query += ` AND (6371 * acos(cos(radians($4)) * cos(radians(latitude)) * cos(radians(longitude) - radians($5)) 
                        + sin(radians($4)) * sin(radians(latitude)))) <= $${queryParams.length}`;
            }
        }
        console.log("Query:", query, "Params:", queryParams); 

        const result = await pool.query(query, queryParams);
        return result.rows;
    } catch (error) {
        console.error("Lỗi truy vấn:", error);
        throw error;
    }
};
