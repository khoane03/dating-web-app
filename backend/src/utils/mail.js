import { transporter } from "../config/mailConfig.js";

export const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}