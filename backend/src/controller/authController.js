import bcrypt from 'bcrypt';


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
       const matchPass = await verifyPassword(password, '$2b$10$bqsSAZF8VA3e2U.EBM4dy.IfaHg9kXO2mg/Np84lIhO.4X9TDh/6G');
        if (matchPass) {
          res.status(200).json({ message: 'Đăng nhập thành công!' });
        } else {
          res.status(401).json({ message: 'Đăng nhập thất bại!' });
        }
  };


export const register = async (req, res) => {
    try {
        // Lấy thông tin từ request body
        const { password } = req.body;
    
        // Mã hóa mật khẩu
        const hashedPassword = await hashPassword(password);
    
        // Trả về response (chỉ ví dụ, không nên trả hash thực tế cho client)
        res.status(200).json({
          message: 'Mật khẩu đã được mã hóa thành công!',
          hashedPassword,
        });
      } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: 'Có lỗi xảy ra!', error: error.message });
      }
}

export const verifyOtp = (req, res) => {
    console.log('POST /login');
}
