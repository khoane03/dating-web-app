const pool = require("../config/db");

// Tạo cuộc trò chuyện mới
exports.createChat = async (name) => {
  const result = await pool.query("INSERT INTO chats (name) VALUES ($1) RETURNING *", [name]);
  return result.rows[0];
};

// Gửi tin nhắn vào cuộc trò chuyện
exports.sendMessage = async ({ chatId, senderId, text }) => {
  const result = await pool.query(
    "INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *",
    [chatId, senderId, text]
  );
  return result.rows[0];
};

// Lấy danh sách tin nhắn
exports.getMessages = async (chatId) => {
  const result = await pool.query(
    "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
    [chatId]
  );
  return result.rows;
};
