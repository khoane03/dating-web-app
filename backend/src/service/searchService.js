import pool from "../config/dbConfig.js";

export const searchUsers = async ({ age, gender}) => {
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
        // if (distance) {
        //     queryParams.push(distance);
        //     query += ` AND distance <= $${queryParams.length}`;
        // }
        console.log("Query:", query, "Params:", queryParams); // Debug query

        const result = await pool.query(query, queryParams);
        return result.rows;
    } catch (error) {
        console.error("Lỗi truy vấn:", error);
        throw error;
    }
};
