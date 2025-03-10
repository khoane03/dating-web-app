import pool from "../config/dbConfig";

// Hàm tính tuổi từ ngày sinh
function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Thêm hoặc cập nhật hồ sơ người dùng
export const addUserProfile = async (fullName, gender, dob, occupation, bio, avatar_url, address, id, hobbies, criteria, longitude, latitude) => {
    const age = calculateAge(dob);

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

// Cập nhật hồ sơ người dùng
export const updateUserProfile = async (id, updates) => {
    try {
        const fields = Object.keys(updates);
        const values = Object.values(updates);
        values.push(id); // Thêm id vào cuối mảng values

        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
        const query = `UPDATE tbl_users SET ${setClause} WHERE acc_id = $${values.length} RETURNING *;`;

        const result = await pool.query(query, values);
        return { code: 200, message: "Hồ sơ đã được cập nhật!", result: result.rows[0] };
    } catch (error) {
        console.error("Lỗi khi cập nhật hồ sơ:", error);
        throw error;
    }
};

// Xóa hồ sơ người dùng
export const deleteUserProfile = async (id) => {
    try {
        const query = `DELETE FROM tbl_users WHERE acc_id = $1 RETURNING *;`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return { code: 404, message: "Hồ sơ không tồn tại!" };
        }

        return { code: 200, message: "Hồ sơ đã được xóa!", result: result.rows[0] };
    } catch (error) {
        console.error("Lỗi khi xóa hồ sơ:", error);
        throw error;
    }
};

// Lấy hồ sơ người dùng theo acc_id
export const getUserProfile = async (id) => {
    try {
        const query = `SELECT * FROM tbl_users WHERE acc_id = $1;`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return { code: 404, message: "Không tìm thấy hồ sơ!" };
        }

        return { code: 200, message: "Lấy hồ sơ thành công!", result: result.rows[0] };
    } catch (error) {
        console.error("Lỗi khi lấy hồ sơ:", error);
        throw error;
    }
};
