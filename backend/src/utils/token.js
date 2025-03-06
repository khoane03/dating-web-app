import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload,
        process.env.JWT_SECRET,
        {
            expiresIn: expiresIn,
            algorithm: 'HS512'
        }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token,
        process.env.JWT_SECRET);
}