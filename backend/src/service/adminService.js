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
        return {
            code: 200,
            message: 'Tài khoản',
            data: rows[0]
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }
};

export const getAllAccounts = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM tbl_accounts OFFSET 0 `);
        return {
            code: 200,
            message: 'Danh sách tài khoản',
            data: rows
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }

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
        return {
            code: 200,
            message: 'Danh sách ghép đôi',
            data: rows
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }
}
