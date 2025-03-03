import pool from "../config/dbConfig.js";

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

const handleError = (message) => ({
    code: 500,
    message,
});