import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { savePost } from '../../service/postService';
import Alert from '../alert/Alert';

function FormAdd({ onClose }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
        }
    };

    const validateInput = () => {
        if (!content.trim() && !file) {
            setError('Vui lòng nhập nội dung hoặc chọn ảnh!');
            return false;
        }
        setError('');
        return true;
    };

    const handleSavePost = async () => {
        if (!validateInput()) return;
        const formData = new FormData();
        formData.append('content', content);
        if (file) formData.append('image', file);
        try {
            setLoading(true);
            const res = await savePost(formData);
            setSuccess(res.message);
            if (res.code === 200) {
                setTimeout(() => {
                    setContent('');
                    setImage(null);
                    setFile(null);
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setError(`Lỗi khi thêm bài viết! ${error.response?.data?.message || ''}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm z-[1000]">
            {error && <Alert onClose={() => setError('')} type="error" message={error} />}
            {success && <Alert onClose={() => setSuccess('')} type="success" message={success} />}
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 transition-all duration-300 scale-100 opacity-100">
                <div className="flex items-center justify-end">
                    <FontAwesomeIcon
                        onClick={onClose}
                        className="cursor-pointer hover:text-red-600"
                        icon={faXmark}
                    />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b">Thêm bài đăng</h2>
                <div className="flex flex-col gap-4">
                    <textarea
                        className="w-full p-2 outline-none resize-none border-b"
                        placeholder="Bạn đang nghĩ gì?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {!image ? (
                        <>
                            <label
                                htmlFor="file"
                                className="text-gray-700 p-2 bg-green-300 rounded-2xl border hover:text-white hover:bg-green-500 text-center cursor-pointer"
                            >
                                Thêm ảnh
                            </label>
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </>
                    ) : (
                        <div className="relative">
                            <FontAwesomeIcon
                                onClick={() => {
                                    setImage(null);
                                    setFile(null);
                                }}
                                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-1 rounded-full cursor-pointer hover:text-red-500"
                                icon={faXmark}
                            />
                            <img src={image} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                        </div>
                    )}
                    {image && <button
                        onClick={handleSavePost}
                        className="text-gray-700 p-2 bg-pink-300 rounded-2xl border hover:text-white hover:bg-pink-500"
                    >
                        {loading ? 'Đang tải...' : 'Đăng'}
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default FormAdd;
