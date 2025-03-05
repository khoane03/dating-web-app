import pool from "../config/dbConfig";

export const update = async (id, fullName, gender, age, occupation, bio, avatar_url, address) => {
    try {
        const query = `
            UPDATE tbl_users
            SET full_name = $1, gender = $2, age = $3, 
                occupation = $4, bio = $5, avatar_url = $6, address = $7
            WHERE acc_id = $8
            RETURNING *;
        `;
        
        const values = [fullName, gender, age, occupation, bio, avatar_url, address, id];
        
        const result = await pool.query(query, values);
        
        return { code: 200, message: "Cập nhật thông tin thành công!", result: result.rows[0] };
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
};
