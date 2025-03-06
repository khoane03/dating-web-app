import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-blue-200">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
