const NoPermission = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
                <h2 className="text-2xl font-semibold mb-2">Bạn không có quyền truy cập</h2>
                <p className="text-gray-600 mb-6">
                    Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
                </p>
                <a
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                    Quay lại trang chủ
                </a>
            </div>
        </div>
    );
};

export default NoPermission;