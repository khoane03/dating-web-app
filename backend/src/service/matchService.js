import pool from "../config/dbConfig.js";

//status = 0: rejected
//status = 1: pending
//status = 2: accepted

export const getMatchById = async (id) => {
    try {
        const user_id_b = await getUserIdByAccId(id);
        const query = `
          SELECT m.id, m.user_id_a, u.full_name, u.avatar_url
          FROM tbl_matches m
          JOIN tbl_users u ON m.user_id_a = u.id
          WHERE m.user_id_b = $1 AND m.status = 1;
        `;
        const { rows } = await pool.query(query, [user_id_b]);
        return rows;
      } catch (error) {
        throw new Error("Lỗi khi lấy danh sách yêu cầu match: " + error.message);
      }

};


export const createMatch = async (id, user_id_b) => {
    try {
        const user_id_a = await getUserIdByAccId(id);

        let query = '';
        let message = '';
        const value = [user_id_a, user_id_b];
        const check = await checkMatch(id, user_id_b);
        if (check) {
            if (check.status === 1) {
                query = 'DELETE FROM tbl_matches WHERE ((user_id_a = $1 AND user_id_b = $2) OR (user_id_a = $2 AND user_id_b = $1))';
                message = 'Huỷ kết nối thành công!';
            } else {
                query = 'UPDATE tbl_matches SET status = 1 WHERE ((user_id_a = $1 AND user_id_b = $2) OR (user_id_a = $2 AND user_id_b = $1)) RETURNING *';
                message = 'Gửi lời mời kết nối thành công!'; 
            }
        } else {
            query = "INSERT INTO tbl_matches (user_id_a, user_id_b, status) VALUES ($1, $2, 1) RETURNING *";
            message = 'Gửi lời mời kết nối thành công!';
        }
        const { rows } = await pool.query(query, value);
        return { message, data: rows[0] };
    } catch (error) {
        return error;
    }
};

export const updateMatch = async (id, status) => {
    try {
        if (status === '0') {
            const { rows } = await pool.query(
                "DELETE FROM tbl_matches WHERE id = $1 RETURNING *",
                [id]
            );
            return rows[0];
        };
        const { rows } = await pool.query(
            "UPDATE tbl_matches SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );
        return rows[0];
    } catch (error) {
        return error;
    }
};

export const getListMatch = async (id) => {
    try {
        const user_id_a = await getUserIdByAccId(id);
        const query = `
          SELECT 
            u.* 
          FROM tbl_matches m
          JOIN tbl_users u ON 
            (m.user_id_a = $1 AND m.user_id_b = u.id) 
            OR 
            (m.user_id_b = $1 AND m.user_id_a = u.id)
          WHERE m.status = 2;
        `;
        const { rows } = await pool.query(query, [user_id_a]);
        return rows;
    } catch (error) {
        console.error("Lỗi getListMatch:", error);
        return error;
    }
};


export const checkMatch = async (id, id_b) => {
    try {
        const id_a = await getUserIdByAccId(id);
        const { rows } = await pool.query(
            "SELECT * FROM tbl_matches WHERE (user_id_a = $1 AND user_id_b = $2) OR (user_id_a = $2 AND user_id_b = $1)",
            [id_a, id_b]
        );
        return rows[0] || null;
    }
    catch (error) {
        return error;
    }
};

const getUserIdByAccId = async (id) => {
    try {
        const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
        const sender_id = res.rows[0].id;
        return sender_id;
    } catch (error) {
        return handleError(error);
    }
};
