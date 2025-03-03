import { verifyToken } from "../utils/token.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ code: 401, message: "Không có token!" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ code: 401, message: "Token không hợp lệ!" });
    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ code: 401, message: "Token không hợp lệ hoặc đã hết hạn!" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ code: 401, message: "Token đã hết hạn!" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ code: 401, message: "Token không hợp lệ!" });
        } else {
            console.error("Lỗi xác thực token:", error);
            return res.status(500).json({ code: 500, message: "Lỗi server khi xác thực token!" });
        }
    }
};
