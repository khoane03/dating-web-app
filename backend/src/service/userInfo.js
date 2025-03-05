import pool from "../config/dbConfig";

export const addProfile = async (fullName, gender, dob, occupation, bio, avatar_url, address, id, hobbies, criteria) => {

    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    const age = calculateAge(dob);
    console.log("age", age);

    try {
        const query = `
        INSERT INTO tbl_users (acc_id, full_name, gender, dob, age, occupation, hobbies, criteria, bio, avatar_url, address)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
    `;

        const values = [id, fullName, gender, dob, age, occupation, hobbies, criteria, bio, avatar_url, address];

        const result = await pool.query(query, values);

        return { code: 200, message: "Cập nhật thông tin thành công!", result: result.rows[0] };
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
};
