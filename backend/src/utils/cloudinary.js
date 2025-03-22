import { cloudinary } from "../config/cloudinaryConfig.js";

const handleCloudinaryUpload = async (file) => {
    const {secure_url} = await cloudinary.uploader.upload(file.path, {
        public_id: file.filename,
        overwrite: true,
    });
    return secure_url;
}

export default handleCloudinaryUpload;