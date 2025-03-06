import pool from "../config/dbConfig.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const getUserLogin = async (user) => {
    try {
        const { id } = user;
        const query = `SELECT * FROM tbl_users WHERE acc_id = $1`;
        const { rows } = await pool.query(query, [id]);

        if (!rows.length) return { code: 404, message: "Không tìm thấy người dùng!" };

        return { code: 200, message: "Thành công!", data: rows[0] };
    } catch (error) {
        return handleError(error.message || "Lỗi server!");
    }
};

export const changePassword = async (id, oldPassword, newPassword) => {
    try {
        const hashedNewPassword = await hashPassword(newPassword);
        const { rows } = await pool.query("SELECT * FROM tbl_accounts WHERE id = $1",
            [id]);
        if (!rows.length) return { code: 400, message: "Không tìm thấy tài khoản!" };
        const isPasswordValid = await comparePassword(oldPassword, rows[0].password);
        if (!isPasswordValid) {
            return { code: 400, message: "Mật khẩu cũ không đúng!" };
        }
        const updateQuery = 'UPDATE tbl_accounts SET password = $1 WHERE id = $2';
        await pool.query(updateQuery, [hashedNewPassword, id]);
        return { code: 200, message: "Thay đổi mật khẩu thành công!" };
    } catch (error) {
        return handleError("Lỗi khi thay đổi mật khẩu", error);
    }
};


const handleError = (message) => ({
    code: 500,
    message,
});