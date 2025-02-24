import pool from "../config/dbConfig";
import { hashPassword, comparePassword } from "../utils/hash";
import { ROLES } from "../utils/appConstants";
import { generateToken } from "../utils/token";

export const login = async (email, password) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM tbl_users WHERE email = $1", 
      [email]
    );
    if (!rows.length) return { code: 401, message: "Tài khoản không tồn tại!" };

    const user = rows[0];
    if (!(await comparePassword(password, user.password))) 
      return { code: 401, message: "Mật khẩu không đúng!" };

    const token = {
        accessToken: generateToken({email: user.email, scope: user.role }, "60s"),
        refreshToken: generateToken({email: user.email, scope: user.role }, "15d"),
    };
    return { code: 200, message: "Đăng nhập thành công!", data: token };

  } catch (error) {
    return { code: 500, message: "Lỗi khi đăng nhập", error: error.message };
  }
};

export const register = async (email, password, phone) => {
  try {
    console.log(password);
    const hashedPassword = await hashPassword(password);
    const { rows } = await pool.query(
      `INSERT INTO tbl_users (email, password, phone, status, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [email, hashedPassword, phone, 1, ROLES.USER]
    );
    return { code: 201, message: "Tạo người dùng thành công!", data: rows[0] };
  } catch (error) {
    return { code: 500, message: "Lỗi khi tạo người dùng", error: error.message };
  }
};
