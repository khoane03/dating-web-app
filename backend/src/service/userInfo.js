import pool from "../config/dbConfig";

export const add = async (fullName, gender, dob, age, occupation, bio, avatar_url, address) => {
    try {
        const query = `
            INSERT INTO tbl_userinfo (full_name, gender, dob, age, occupation, bio, avatar_url, address)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        
        const values = [fullName, gender, dob, age, occupation, bio, avatar_url, address];
        
        const result = await pool.query(query, values);
        
        return { code: 200, message: "Thêm thông tin thành công!", result };
    } catch (error) {
        console.error("Error inserting user info:", error);
        throw error;
    }
};
