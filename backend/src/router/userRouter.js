import express from "express";
import { 
    getUserLogin, 
    changePassword, 
    addOrUpdateProfile 
} from "../controller/userController.js";
import multer from "multer";

export const userRouter = express.Router();

// Cấu hình Multer để lưu ảnh vào thư mục uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Tạo tên file duy nhất
    },
});

const upload = multer({ storage });

// Route upload ảnh
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
    }
    const fileUrl = `/uploads/${req.file.filename}`; // Đường dẫn ảnh
    res.json({ url: fileUrl }); // Trả về URL ảnh
});

userRouter.post("/add_profile", addOrUpdateProfile);
userRouter.get("/info", getUserLogin);
userRouter.put("/change-password", changePassword);
