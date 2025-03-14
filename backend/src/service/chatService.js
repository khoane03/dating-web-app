import pool from "../config/dbConfig";
export const saveMess = async (id, receiverId, message) => {
    const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
    const sender_id = res.rows[0].id;
    try {
        const query = `
    INSERT INTO tbl_message (sender_id, receiver_id, message) 
    VALUES ($1, $2, $3) RETURNING *;
  `;
        const values = [sender_id, receiverId, message];

        const { rows } = await pool.query(query, values);
        return handleSuccess(200, "Thành công", rows[0]);
    } catch (error) {
        return handleError(error);
    }
}

export const getMess = async (id, receiver_id) => {
    try {
        const res = await pool.query("SELECT id FROM tbl_users WHERE acc_id = $1", [id]);
        const sender_id = res.rows[0].id;
        const query = `
                SELECT
            chat.sender_id,
            chat.receiver_id,
            chat.message,
            user_b.full_name as receiver_name,
            user_b.avatar_url as receiver_avatar
        FROM
            tbl_message as chat
            JOIN tbl_users as user_a ON user_a.id = chat.sender_id
            JOIN tbl_users as user_b ON user_b.id = chat.receiver_id
        WHERE
            (chat.sender_id = $1 AND chat.receiver_id = $2)
            OR (chat.sender_id = $2 AND chat.receiver_id = $1)
        ORDER BY sent_at ASC;
        `;
        const values = [receiver_id, sender_id];  
        const { rows } = await pool.query(query, values);
        return handleSuccess(200, "Thành công", rows);
    } catch (error) {
        return handleError(error);
    }


}


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