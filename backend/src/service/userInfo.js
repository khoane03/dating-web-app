import pool from "../config/dbConfig";

export const addProfile = async (fullName, gender, dob, occupation, bio, avatar_url, address, id, hobbies, criteria, longitude, latitude)  => {

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
        INSERT INTO tbl_users (acc_id, full_name, dob, gender, age, occupation, bio, avatar_url, address, created_at, criteria, hobbies, longitude, latitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11, $12, $13)
        ON CONFLICT (acc_id) DO UPDATE 
        SET full_name = EXCLUDED.full_name,
            dob = EXCLUDED.dob,
            gender = EXCLUDED.gender,
            age = EXCLUDED.age,
            occupation = EXCLUDED.occupation,
            bio = EXCLUDED.bio,
            avatar_url = EXCLUDED.avatar_url,
            address = EXCLUDED.address,
            created_at = NOW(),
            criteria = EXCLUDED.criteria,
            hobbies = EXCLUDED.hobbies,
            longitude = EXCLUDED.longitude,
            latitude = EXCLUDED.latitude
        RETURNING *;
    `;

        const values = [id, fullName, dob, gender, age, occupation, bio, avatar_url, address, criteria, hobbies, longitude, latitude];


        const result = await pool.query(query, values);

        return { code: 200, message: "Cập nhật thông tin thành công!", result: result.rows[0] };
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
};
