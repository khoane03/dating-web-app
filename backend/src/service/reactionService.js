import pool from '../config/dbConfig.js';

// Hàm chính xử lý reaction
export const addReaction = async (id, reaction_type, post_id) => {
    try {
        const user_id = await getUserIdByAccId(id);
        const existingReaction = await checkExistingReaction(user_id, post_id);

        if (existingReaction) {
            if (existingReaction.reaction_type === reaction_type) {
                await deleteReaction(user_id, post_id);
                return { status: 200, message: "Đã bỏ reaction" };
            } else {
                const updatedReaction = await updateReaction(user_id, reaction_type, post_id);
                return { status: 200, message: "Đã đổi reaction", data: updatedReaction };
            }
        } else {
            const newReaction = await insertReaction(user_id, reaction_type, post_id);
            return { status: 200, message: "Reaction thành công", data: newReaction };
        }
    } catch (error) {
        return { status: 500, message: "Lỗi server", error: error.message };
    }
};

export const countReaction = async (post_id) => {
    try {
        const { rows } = await pool.query(`SELECT COUNT(*) FROM tbl_reaction WHERE post_id = $1`, [post_id]);
        return {
            status: 200,
            message: "Thành công",
            data: rows[0],
        };
    } catch (error) {
        return {
            status: 500,
            message: "Lỗi",
            data: error,
        };
    }
};


// Kiểm tra xem user đã reaction bài post chưa
export const checkExistingReaction = async (id, post_id) => {
    try {
        const user_id = await getUserIdByAccId(id);
        const { rows } = await pool.query(
            `SELECT * FROM tbl_reaction WHERE user_id = $1 AND post_id = $2`,
            [user_id, post_id]
        );
        return rows[0] || null;
    } catch (error) {
        return {
            status: 500,
            message: "Lỗi",
            data: error,
        }
    }
};

// Xóa reaction nếu user nhấn lại vào reaction cũ
const deleteReaction = async (user_id, post_id) => {
    await pool.query(
        `DELETE FROM tbl_reaction WHERE user_id = $1 AND post_id = $2`,
        [user_id, post_id]
    );
};

// Cập nhật reaction nếu user chọn reaction khác
const updateReaction = async (user_id, reaction_type, post_id) => {
    const { rows } = await pool.query(
        `UPDATE tbl_reaction SET reaction_type = $1 WHERE user_id = $2 AND post_id = $3 RETURNING *`,
        [reaction_type, user_id, post_id]
    );
    return rows[0];
};

// Thêm reaction mới nếu user chưa từng reaction
const insertReaction = async (user_id, reaction_type, post_id) => {
    const { rows } = await pool.query(
        `INSERT INTO tbl_reaction (user_id, reaction_type, post_id) 
        VALUES ($1, $2, $3) RETURNING *`,
        [user_id, reaction_type, post_id]
    );
    return rows[0];
};


const getUserIdByAccId = async (id) => {
    try {
        const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
        const user_id = res.rows[0].id;
        return user_id;
    } catch (error) {
        return {
            status: 500,
            message: "Lỗi",
            data: error,
        };
    }
};