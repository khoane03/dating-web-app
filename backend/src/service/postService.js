import pool from "../config/dbConfig";

export const getAllPosts = async (id) => {
    try {
        const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
        const user_id = res.rows[0].id;
        const { rows } = await pool.query(`
            SELECT 
                u.full_name,
                up.user_id,
                up.content,
                up.image_url
            FROM
                tbl_user_post as up
                JOIN tbl_users as u ON up.user_id = u.id
            WHERE 
                up.user_id != $1
            ORDER BY up.created_at DESC;`, [user_id]);
        if (!rows.length) {
            return handleSuccess(400, "Không có bài viết nào!");
        }
        return handleSuccess(200, "Thành công!", rows);
    } catch (error) {
        return handleError(error);
    }
};


export const getImageByUserId = async (id) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM tbl_user_post WHERE user_id = $1;`, [id]);
        if (!rows.length) {
            return handleSuccess(400, "Không tìm thấy bài viết!");
        }
        return handleSuccess(200, "Thành công!", rows);
    } catch (error) {
        return handleError(error);
    }
};


export const saveImage = async (user_id, content, image_url) => {
    try {
        const { rows } = await pool.query(`INSERT INTO tbl_user_post (user_id, content, image_url)
        VALUES ($1, $2, $3) RETURNING *;`,
            [user_id, content, image_url]);
        if (!rows.length) {
            return handleSuccess(400, "Không thể lưu ảnh!");
        }
        return handleSuccess(200, "Thêm bài viết thành công!", rows[0]);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteById = async (id) => {
    try {
        const { rows } = await pool.query(`DELETE FROM tbl_user_post WHERE id = $1 RETURNING *;`, [id]);
        if (!rows.length) {
            return handleSuccess(400, "Không thể xóa bài viết!");
        }
        return handleSuccess(200, "Xóa bài viết thành công!", rows[0]);
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
const handleError = (code, error) => {
    return {
        code: code || 500,
        message: error
    }
}