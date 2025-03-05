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

export const authRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ code: 401, message: "Chưa xác thực! Vui lòng đăng nhập." });
        }
        const userRole = req.user.scope

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ 
                code: 403, 
                message: "Quyền truy cập bị từ chối! Bạn không có quyền thực hiện hành động này." 
            });
        }
        next();
    };
};