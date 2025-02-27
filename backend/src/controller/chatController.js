const chatService = require("../service/chatService");

// Tạo cuộc trò chuyện mới
exports.createChat = async (req, res) => {
  try {
    const chat = await chatService.createChat(req.body.name);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gửi tin nhắn
exports.sendMessage = async (req, res) => {
  try {
    const message = await chatService.sendMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tin nhắn trong cuộc trò chuyện
exports.getMessages = async (req, res) => {
  try {
    const messages = await chatService.getMessages(req.params.chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
