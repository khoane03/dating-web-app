import pool from "../config/dbConfig.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

const handleError = (error) => ({
    code: 500,
    message: error.message || error || "Lỗi server!",
});

export const getUserLogin = async (user) => {
    try {
        if (!user || !user.id) {
            return { code: 400, message: "Thiếu thông tin người dùng!" };
        }

        const { id } = user;
        const query = `SELECT * FROM tbl_users WHERE acc_id = $1`;
        const { rows } = await pool.query(query, [id]);

        if (!rows.length) return { code: 404, message: "Không tìm thấy người dùng!" };

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
export const updateUserProfile = async (id, data) => {
    try {
        if (!id || !data) {
            return { code: 400, message: "Thiếu thông tin cần thiết!" };
        }

        const { full_name, age, gender, occupation, hobbies, bio, criteria, address, avatar_url } = data;
        
        // Cập nhật thông tin người dùng
        await pool.query(`
            UPDATE tbl_users 
            SET full_name = $1, age = $2, gender = $3, occupation = $4, 
                hobbies = $5, bio = $6, criteria = $7, address = $8, avatar_url = $9
            WHERE acc_id = $10
        `, [full_name, age, gender, occupation, hobbies, bio, criteria, address, avatar_url, id]);

        return { code: 200, message: "Cập nhật hồ sơ thành công!" };
    } catch (error) {
        return handleError(error);
    }
};
