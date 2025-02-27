import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const [image, setImage] = useState("/avatar.png");
  const handleImageUpload = (Event) => {
    const file = Event.target.files[0]; //Lấy file ảnh từ input
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // cập nhật state để hiển thị ảnh mới 
    }
  };
  const fileInputRef = React.useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-96 bg-white rounded-3xl overflow-hidden shadow-lg p-6">
        {/* ảnh đại diện */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300">

        <img src={image} alt="Profile" className="w-full h-full object-cover" />


        </div>

        {/* thông tin cá nhân  */}
        <div className="text-center mt-4 text-gray-800">
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
            Liz, 23 <FaCheckCircle className="text-blue-500" />
          </h1>
          <p><strong>Giới tính:</strong> Nữ</p>
          <p><strong>Nghề nghiệp:</strong> Kỹ sư phần mềm</p>
          <p><strong>Sở thích:</strong> Đọc sách, nghe nhạc, du lịch</p>
        </div>

        {/* Hồ sơ  */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Hồ sơ chi tiết</h2>
          <p><strong>Mô tả bản thân:</strong> Năng động, thích khám phá và yêu công nghệ.</p>
          <p><strong>Tiêu chuẩn tìm kiếm:</strong> Chân thành, hài hước và có chí tiến thủ.</p>
          <p><strong>Vị trí hiện tại:</strong> Hà Nội. </p>
        </div>

        {/*ảnh & Album */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Ảnh & Album</h2>
          <input type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden" />
          <button onClick={handleButtonClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
  Tải ảnh lên
</button>

        </div>

        {/* cài đặt*/}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Cài đặt hồ sơ</h2>
          <p>Thay đổi mật khẩu </p>
        </div>

        {/* xác minh tài khoản */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Xác minh tài khoản</h2>
          <p>Trạng thái xác minh: <span className="text-green-500">Đã xác minh</span></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
