import bcrypt from 'bcrypt';
import pool from '../config/dbConfig.js';


const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error('Lỗi mã hóa mật khẩu:', error);
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      "SELECT * FROM tbl_users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email không tồn tại!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công!",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Lỗi đăng nhập:", error); 
    res.status(500).json({
      success: false,
      message: "Lỗi khi đăng nhập",
    });
  }
};



export const register = async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO tbl_users (email, password, phone, status, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, hashedPassword, phone, 1, 'role_user']
    );
    res.status(201).json({
      success: true,
      message: "Tạo người dùng thành công!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo người dùng",
      error: error.message,
    });
  }
}
