import pool from "../config/dbConfig.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { ROLES } from "../utils/appConstants.js";
import { generateToken, verifyToken } from "../utils/token.js";
import { sendMail } from "../utils/mail.js";

const otpStorage = new Map();

export const login = async (email, password) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tbl_accounts WHERE email = $1 AND status = 1", [email]);
    if (!rows.length) return { code: 401, message: "Tài khoản không tồn tại hoặc đăng bị khoá!" };

    const account = rows[0];
    const isPasswordValid = await comparePassword(password, account.password);
    if (!isPasswordValid) return { code: 401, message: "Mật khẩu không đúng!" };

    return {
      code: 200,
      message: "Đăng nhập thành công!",
      data: generateAuthTokens(account),
    };
  } catch (error) {
    return handleError("Lỗi khi đăng nhập", error);
  }
};

export const handleGoogleCallback = async (account) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows: existingUsers } = await client.query("SELECT * FROM tbl_accounts WHERE social_id = $1", [account.sub]);
    if (existingUsers.length > 0) {
      await client.query("COMMIT");
      return { code: 200, message: "Đăng nhập thành công!", data: generateAuthTokens(existingUsers[0]) };
    }

    const { rows } = await client.query(
      `INSERT INTO tbl_accounts (email, status, social_id, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role`,
      [account.email, 1, account.sub, ROLES.USER]
    );

    await client.query(
      `INSERT INTO tbl_users (acc_id, full_name, avatar_url) VALUES ($1, $2, $3)`,
      [rows[0].id, account.name, account.picture]
    );

    await client.query("COMMIT");
    return { code: 200, message: "Đăng ký thành công!", data: generateAuthTokens(rows[0]) };
  } catch (error) {
    await client.query("ROLLBACK");
    return handleError("Có lỗi xảy ra trong quá trình xử lý!", error);
  } finally {
    client.release();
  }
};

export const register = async (email, password, phone) => {
  try {
    const checkQuery = await pool.query(
      "SELECT * FROM tbl_accounts WHERE email = $1 OR phone = $2",
      [email, phone]
    );
    if (checkQuery.rows.length > 0) {
      return { code: 400, message: "Email/số điện thoại đã được sử dụng" };
    }
    const hashedPassword = await hashPassword(password);
    const { rows } = await pool.query(
      `INSERT INTO tbl_accounts (email, password, phone, status, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [email, hashedPassword, phone, 1, ROLES.USER]
    );
    return { code: 201, message: "Tạo người dùng thành công!", data: rows[0] };
  } catch (error) {
    return handleError("Lỗi khi tạo người dùng", error);
  }
};

export const forgotPassword = async (email, password) => {
  try {
    const result = await checkEmailExist(email);
    if (result.code !== 200) return result;
    const hashedPassword = await hashPassword(password);
    const updateQuery = 'UPDATE tbl_accounts SET password = $1 WHERE email = $2';
    await pool.query(updateQuery, [hashedPassword, email]);

    return { code: 200, message: "Đặt lại mật khẩu thành công!" };
  } catch (error) {
    return handleError("Lỗi", error);
  }
};


export const checkEmailExist = async (email) => {
  try {
    const checkQuery = 'SELECT * FROM tbl_accounts WHERE email = $1 AND status = 1';
    const { rows } = await pool.query(checkQuery, [email]);
    if (!rows.length) {
      return { code: 400, message: "Không tìm thấy tài khoản hoặc tài khoản đang bị khoá!" };
    }
    return { code: 200, message: "Email hợp lệ!" };
  } catch (error) {
    return handleError("Lỗi khi kiểm tra email", error);
  }
}


export const refreshToken = async (token) => {
  const decoded = verifyToken(token);
  if (!decoded) return { code: 401, message: "Token không hợp lệ!" };

  return {
    code: 200,
    message: "Tạo token mới thành công!",
    data: { accessToken: generateToken({ id: decoded.id, email: decoded.email, scope: decoded.scope }, "60s") },
  };
};

export const sendOtp = async (email) => {
  const otp = generateOtp(email);
  await sendMail(email, "Mã OTP", `Mã OTP của bạn là ${otp}`);
  return { code: 200, message: "Gửi mã OTP thành công!" };
};

export const verifyOtp = (email, otp) => {
  const storedData = otpStorage.get(email);
  if (!storedData || Date.now() > storedData.expireTime) {
    otpStorage.delete(email);
    return { code: 400, message: "Mã OTP không hợp lệ hoặc đã hết hạn!" };
  }

  if (storedData.otp.toString() !== otp.toString()) {
    return { code: 400, message: "Mã OTP không đúng!" };
  }

  otpStorage.delete(email);
  return { code: 200, message: "Xác thực thành công!" };
};

const generateOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage.set(email, { otp, expireTime: Date.now() + 60 * 1000 });
  return otp;
};

const generateAuthTokens = (account) => ({
  accessToken: generateToken({ id: account.id, email: account.email, scope: account.role }, "60s"),
  refreshToken: generateToken({ id: account.id, email: account.email, scope: account.role }, "15d"),
});

const handleError = (message, error) => ({
  code: 500,
  message,
  error: error.message,
});
