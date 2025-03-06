import { Link } from "react-router-dom";
import React from 'react';

function IntroducePage() {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-between">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold text-pink-600">Dating App</Link>
        <nav>
          <Link to={"/auth"} className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-600 hover:text-white ml-2">Đăng nhập</Link>
          <Link to={"/auth/register"} className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-600 hover:text-white ml-2">Đăng ký</Link>
        </nav>
      </header>

      <main className="flex flex-col items-center mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tìm kiếm nửa kia của bạn</h2>
        <p className="text-gray-600 mb-6">Kết nối và bắt đầu hành trình tình yêu ngay hôm nay!</p>
        <Link to={"/auth"}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
          Bắt đầu ngay</Link>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-800">Dễ sử dụng</h3>
            <p className="text-gray-600 text-center">Giao diện thân thiện và dễ dàng sử dụng trên mọi thiết bị.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-800">Kết nối an toàn</h3>
            <p className="text-gray-600 text-center">Thông tin bảo mật tuyệt đối, an toàn khi kết nối.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-800">Tìm kiếm nhanh chóng</h3>
            <p className="text-gray-600 text-center">Dễ dàng tìm kiếm người phù hợp với bạn.</p>
          </div>
        </section>
      </main>

      <footer className="w-full bg-white shadow-md p-4 mt-10 text-center">
        <p className="text-gray-600">© Nhóm 2</p>
      </footer>
    </div>
  );
}

export default IntroducePage;