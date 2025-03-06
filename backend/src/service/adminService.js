import pool from "../config/dbConfig";
import { ROLES } from "../utils/appConstants";
import { hashPassword } from "../utils/hash";

export const initAdmin = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM tbl_accounts WHERE role = $1`, [ROLES.ADMIN]);
        if (rows.length > 0) {
            return;
        }
        const password = await hashPassword('admin');
        await pool.query(`INSERT INTO tbl_accounts (email, password, status, role) VALUES ($1, $2, $3, $4)`,
            ['admin', password, 1, ROLES.ADMIN]);
        console.log('Tài khoản: admin Mật khẩu: admin. Đã được tạo');
        return;
    } catch (error) {
        console.log('Lỗi khi tạo tài khoản admin:', error.message);
        return;
    }
};

export const getAccById = async (id) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM tbl_accounts WHERE id = $1`, [id]);
        return handleSuccess(200, 'Tài khoản', rows[0]);
    } catch (error) {
        return handleError(error);
    }
};

export const getAllAccounts = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM tbl_accounts OFFSET 0 `);
        return handleSuccess(200, 'Danh sách tài khoản', rows);
    } catch (error) {
        return handleError(error);
    }
};

export const getAllMatches = async () => {
    try {
        const query = `SELECT
                            match.id,
                            user_a.full_name as user_a,
                            user_b.full_name as user_b,
                            match.status,
                            match.matched_at,
                            match.updated_at
                        FROM
                            tbl_matches as match
                            JOIN tbl_users as user_a ON match.user_id_a = user_a.id
                            JOIN tbl_users as user_b ON match.user_id_b = user_b.id
                        
                        ORDER BY
                            matched_at DESC
                        OFFSET 0 LIMIT 10;`;

        const { rows } = await pool.query(query);
        return handleSuccess(200, 'Danh sách matches', rows);
    } catch (error) {
        return handleError(error);
    }
}

export const updatStatusAccount = async (id, status) => {
    try {
        const query = `UPDATE tbl_accounts SET status = $1 WHERE id = $2`;
        await pool.query(query, [status, id]);
        return handleSuccess(200, 'Cập nhật tài khoản thành công!');
    } catch (error) {
        return handleError(error);
    }
}; 

export const deleteAccountById = async (id) => {
    try {
        const query = `DELETE FROM tbl_accounts WHERE id = $1`;
        await pool.query(query, [id]);
        return handleSuccess(200, 'Xóa tài khoản thành công');
    } catch (error) {
       return handleError(error);
    }
};

export const deleteMatchById = async (id) => {
    try {
        const query = `DELETE FROM tbl_matches WHERE id = $1`;
        await pool.query(query, [id]);
        return handleSuccess(200, 'Xóa match thành công');
    } catch (error) {
        return handleError(error);
    }
};



const handleSuccess = (code, message, data) => {
    return {
        code: code,
        message,
        data
    }
}   
const handleError = (error) => {
    return {
        code: 500,
        message: error.message
    }
}