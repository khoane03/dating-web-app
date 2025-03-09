import express from "express";
import { 
    addUserProfile, 
    getUserLogin, 
    updateUserProfile, 
    deleteUserProfile, 
    getUserProfile, 
    changePassword 
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


userRouter.post("/add-profile", addUserProfile);
userRouter.put("/update-profile", updateUserProfile);
userRouter.delete("/delete-profile", deleteUserProfile);
userRouter.get("/profile", getUserProfile);
userRouter.get("/info", getUserLogin);
userRouter.put("/change-password", changePassword);
