import pool from "../config/dbConfig.js";
import { generateToken, verifyToken } from "../utils/token.js";

export const getUserLogin = async (token) => {
    try {
        const result = await verifyToken(token);
        const userId = result.id;
        const query = `SELECT * FROM tbl_users WHERE id = $1`;
        const [rows] = await pool.query(query, [userId]);
        console.log(rows[0]);
        return { code: 200, message: "Thành công!", data: rows[0] };
    } catch (error) {
        return handleError(error);
    }
}
const handleError = (message) => ({
    code: 500,
    message,
});

