import bcrypt from 'bcrypt';
import pool from '../config/dbConfig.js';


const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log('Mật khẩu đã mã hóa:', hash);
    return hash;
  } catch (error) {
    console.error('Lỗi mã hóa mật khẩu:', error);
  }
};

const verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      console.log('Mật khẩu chính xác!');
    } else {
      console.log('Mật khẩu không chính xác!');
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra mật khẩu:', error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
 
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


export const verifyOtp = (req, res) => {
  console.log('POST /login');
}
