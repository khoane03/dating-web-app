import pool from "../config/dbConfig.js";
import { ROLES } from "../utils/appConstants.js";
import { hashPassword } from "../utils/hash.js";

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

export const getAllAccounts = async (pageIndex, pageSize) => {
    try {
        const totalRecords = await countRecord('tbl_accounts');
        if (!pageSize) {
            const { rows } = await pool.query(`SELECT * FROM tbl_accounts`);
            return handleSuccess(200, 'Danh sách tài khoản', rows, totalRecords);
        }
        const { rows } = await pool.query(`SELECT * FROM tbl_accounts OFFSET $1 LIMIT $2`, [(pageIndex - 1) * pageSize, pageSize]);
        return handleSuccess(200, 'Danh sách tài khoản', rows, totalRecords);
    } catch (error) {
        return handleError(error);
    }
};

export const getAllMatches = async (pageIndex, pageSize) => {
    try {
        const totalRecords = await countRecord('tbl_matches');
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
                        OFFSET $1 LIMIT $2;`;

        const { rows } = await pool.query(query, [(pageIndex - 1) * pageSize, pageSize]);
        return handleSuccess(200, 'Danh sách matches', rows, totalRecords);
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

export const searchAccount = async (keyword) => {
    try {
        let query = `SELECT * FROM tbl_accounts
                         WHERE email LIKE $1
                            OR role LIKE $1 `;
        const values = [`%${keyword}%`];

        if (!isNaN(keyword)) {
            query += ` OR status = $2 `;
            values.push(parseInt(keyword, 10));
        }
        const { rows } = await pool.query(query, values);
        return handleSuccess(200, 'Danh sách tài khoản', rows);
    } catch (error) {
        return handleError(error);
    }
};

const countRecord = async (table) => {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM ${table}`);
    return rows[0].count;
};

const handleSuccess = (code, message, data, totalRecords) => {
    return {
        code,
        message,
        totalRecords,
        data
    }
}
const handleError = (error) => {
    return {
        code: 500,
        message: error.message
    }
}