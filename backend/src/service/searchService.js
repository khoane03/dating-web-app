import pool from "../config/dbConfig.js";

export const searchUsers = async ({ age, gender, distance, userLat, userLong}) => {
    try {
        let query = `SELECT * FROM tbl_users WHERE 1=1`;

        const queryParams = [];

        if (gender && gender !== "Tất cả") {
            queryParams.push(gender);
            query += ` AND gender = $${queryParams.length}`;
        }
        if (age) {
            queryParams.push(parseInt(age, 10));
            query += ` AND age <= $${queryParams.length}`;
        }

        if (userLat && userLong) {
            queryParams.push(parseFloat(userLat)); // Add userLat
            const latIndex = queryParams.length;
            queryParams.push(parseFloat(userLong)); // Add userLong
            const longIndex = queryParams.length;

            query = query.replace(
                'SELECT *',
                `SELECT *, 
                (6371 * acos(cos(radians($${latIndex})) * cos(radians(latitude)) * 
                cos(radians(longitude) - radians($${longIndex})) + 
                sin(radians($${latIndex})) * sin(radians(latitude)))) AS distance`
            );

            query += ` AND latitude IS NOT NULL AND longitude IS NOT NULL`;

            if (distance) {
                queryParams.push(parseInt(distance, 10));
                query += ` AND (6371 * acos(cos(radians($${latIndex})) * cos(radians(latitude)) * 
                            cos(radians(longitude) - radians($${longIndex})) + 
                            sin(radians($${latIndex})) * sin(radians(latitude)))) <= $${queryParams.length}`;
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
