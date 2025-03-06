import pool from "../config/dbConfig";
export const saveMess = async(id, receiverId, message) => {
try {
    const query = `
    INSERT INTO tbl_message (sender_id, receiver_id, message) 
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [id, receiverId, message];

  const { rows } = await pool.query(query, values);
  return handleSuccess(200, "Thành công", rows[0]);
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