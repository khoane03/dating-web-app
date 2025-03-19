import pool from "../config/dbConfig";
export const saveMess = async (sender_id, receiverId, message) => {
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
        const sender_id = await getUserIdByAccId(id);
        const query = `SELECT *
        FROM
            tbl_message
        WHERE
            (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)
        ORDER BY sent_at ASC; `;
        const values = [receiver_id, sender_id];
        const { rows } = await pool.query(query, values);
        return handleSuccess(200, "Thành công", rows);
    } catch (error) {
        return handleError(error);
    }
}

export const getInfoChat = async (receiver_id) => {
    try {
        const { rows } = await pool.query("SELECT id, full_name, avatar_url FROM tbl_users WHERE id = $1",
            [receiver_id]);
        return handleSuccess(200, "Thành công", rows[0]);
    } catch (error) {
        return handleError(error);
    }
};

export const getListChat = async (id) => {
    try {
        const sender_id = await getUserIdByAccId(id);
        const { rows } = await pool.query(`
            SELECT DISTINCT ON (chat_partner.user_id) 
                chat_partner.user_id AS chat_id,
                chat_partner.full_name,
                chat_partner.avatar_url
            FROM (
                SELECT 
                    receiver.id AS user_id, 
                    receiver.full_name, 
                    receiver.avatar_url,
                    msg.sent_at
                FROM tbl_message msg
                JOIN tbl_users receiver ON msg.receiver_id = receiver.id
                WHERE msg.sender_id = $1 

                UNION

                SELECT 
                    sender.id AS user_id, 
                    sender.full_name, 
                    sender.avatar_url,
                    msg.sent_at
                FROM tbl_message msg
                JOIN tbl_users sender ON msg.sender_id = sender.id
                WHERE msg.receiver_id = $1 
            ) AS chat_partner
            ORDER BY chat_partner.user_id, chat_partner.sent_at DESC;
`, [sender_id]);
        return handleSuccess(200, "Thành công", rows);
    } catch (error) {
        return handleError(error);
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