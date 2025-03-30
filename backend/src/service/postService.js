import pool from "../config/dbConfig.js";

export const getAllPosts = async (id) => {
    try {
        const user_id = await getUserId(id);
        const { rows } = await pool.query(`
            SELECT 
                u.full_name,
                u.latitude,
                u.longitude,
                u.avatar_url,
                up.id,
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
        const data = resultPost(rows);
        return handleSuccess(200, "Thành công!", data);
    } catch (error) {
        return handleError(error);
    }
};

export const getImageByUserId = async (id) => {
    try {
        const { rows } = await pool.query(`SELECT 
                u.full_name,
                u.latitude,
                u.longitude,
                u.avatar_url,
                up.id,
                up.user_id,
                up.content,
                up.image_url
            FROM
                tbl_user_post as up
                JOIN tbl_users as u ON up.user_id = u.id
            WHERE user_id = $1;`, [id]);
        if (!rows.length) {
            return handleSuccess(400, "Không có bài viết nào!");
        }
        const data = resultPost(rows);
        return handleSuccess(200, "Thành công!", data);
    } catch (error) {
        return handleError(error);
    }
};


export const saveImage = async (id, content, image_url) => {
    try {
        const user_id = await getUserId(id);
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

const getUserId = async (id) => {
    try {
        const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
        return res.rows[0].id;
    } catch (error) {
        return handleError(error);
    }
};

const resultPost = (rows) => {
    const data = new Map();

    rows.forEach(row => {
        if (!data.has(row.user_id)) {
            data.set(row.user_id, {
                avatar_url: row.avatar_url,
                user_id: row.user_id,
                full_name: row.full_name,
                latitude: row.latitude,
                longitude: row.longitude,
                posts: new Map(),
            });
        }
        const userData = data.get(row.user_id);

        if (!userData.posts.has(row.id)) {
            userData.posts.set(row.id, {
                id: row.id,
                images: null,
                contents: null,
            });
        }

        const post = userData.posts.get(row.id);
        if (row.image_url) post.images = row.image_url;
        if (row.content) post.contents = row.content;
    });
    return Array.from(data.values()).map(user => ({
        ...user,
        posts: Array.from(user.posts.values()),
    }));
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
        message: error
    }
}