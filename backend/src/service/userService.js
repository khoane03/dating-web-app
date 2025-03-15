import pool from "../config/dbConfig.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const getInfoUser = async (id, type) => {
    try {
        let query = null;
        if (type === 'id') {
            query = `SELECT * FROM tbl_users WHERE id = $1`;
        } else {
            query = `SELECT * FROM tbl_users WHERE acc_id = $1`;
        }
        const { rows } = await pool.query(query, [id]);
        return { code: 200, message: "Thành công!", data: rows[0] };
    } catch (error) {
        return handleError(error);
    }
};

export const changePassword = async (id, oldPassword, newPassword) => {
    try {
        if (!id || !oldPassword || !newPassword) {
            return { code: 400, message: "Thiếu thông tin cần thiết!" };
        }

        const { rows } = await pool.query("SELECT * FROM tbl_accounts WHERE id = $1", [id]);

        if (!rows.length) return { code: 404, message: "Không tìm thấy tài khoản!" };

        const isPasswordValid = await comparePassword(oldPassword, rows[0].password);
        if (!isPasswordValid) return { code: 400, message: "Mật khẩu cũ không đúng!" };

        const hashedNewPassword = await hashPassword(newPassword);
        await pool.query("UPDATE tbl_accounts SET password = $1 WHERE id = $2", [hashedNewPassword, id]);

        return { code: 200, message: "Thay đổi mật khẩu thành công!" };
    } catch (error) {
        return handleError(error);
    }
};
export const addOrUpdateProfile = async (id, data) => {
    try {
        if (!id || !data) {
            return { code: 400, message: "Thiếu thông tin cần thiết!" };
        }

        const { full_name, dob, gender, occupation, hobbies, bio, criteria, avatar_url } = data;
        const age = calculateAge(dob);

        // Kiểm tra xem user đã tồn tại chưa
        const query = `SELECT * FROM tbl_users WHERE acc_id = $1`;
        const { rows } = await pool.query(query, [id]);

        const value = [full_name, dob, gender, occupation, hobbies, bio, criteria, age, avatar_url, id];

        if (rows.length) {

            await pool.query(`
                UPDATE tbl_users 
                SET full_name = $1, dob = $2, gender = $3, occupation = $4, 
                    hobbies = $5, bio = $6, criteria = $7, age = $8, avatar_url = $9
                WHERE acc_id = $10
            `, value);
        } else {
            await pool.query(`
                INSERT INTO tbl_users (full_name, dob, gender, occupation, hobbies, bio, criteria, age, avatar_url, acc_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, value);
        }

        return { code: 200, message: "Cập nhật hồ sơ thành công!" };
    } catch (error) {
        return handleError(error);
    }
};

export const updateAvatar = async (id, avatarUrl) => {
    try {
        await pool.query("UPDATE tbl_users SET avatar_url = $1 WHERE id = $2", [avatarUrl, id]);

        return { code: 200, message: "Cập nhật ảnh đại diện thành công!" };
    } catch (error) {
        return handleError(error);
    }
};



//hàm tính tuổi
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


const handleError = (error) => ({
    code: 500,
    message: error.message || error || "Lỗi server!",
});
