const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Lấy lịch sử tin nhắn giữa hai người
router.get("/:userId/:partnerId", async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: {
                senderId: req.params.userId,
                receiverId: req.params.partnerId
            },
            order: [["createdAt", "ASC"]],
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lưu tin nhắn vào database
router.post("/", async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = await Message.create({ senderId, receiverId, content });
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
