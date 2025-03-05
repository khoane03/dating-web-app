import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getUserLogin } from "../../service/userService";

const Profile = () => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState([]);

  const getInfo = async () => {
    try {
      const res = await getUserLogin();
      setData(res.data);
    } catch (error) {

    }
  }
  useEffect(() => {
    getInfo();
  }, []);




  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-96 bg-white rounded-3xl overflow-hidden shadow-lg p-6">
        {/* ảnh đại diện */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300">

          <img src={data.avatar_url} alt="Profile" className="w-full h-full object-cover" />


        </div>

        {/* thông tin cá nhân  */}
        <div className="text-center mt-4 text-gray-800">
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
            {data.full_name}, {data.age} <FaCheckCircle className="text-blue-500" />
          </h1>
          <p><strong>Giới tính:</strong> {data.gender}</p>
          <p><strong>Nghề nghiệp:</strong> {data.occupation}</p>
          <p><strong>Sở thích:</strong> {data.hobbies}</p>
        </div>

        {/* Hồ sơ */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Hồ sơ chi tiết</h2>
          <p><strong>Mô tả bản thân:</strong></p>
          <input
            className="outline p-2 border border-gray-300 rounded-lg w-full"
            type="text"
            disabled={!isUpdate}
            value={data.bio}
            // onChange={(e) => setDescription(e.target.value)}
          />
          <p><strong>Tiêu chuẩn tìm kiếm:</strong>{data.criteria}</p>
          <p><strong>Vị trí hiện tại:</strong> {data.address} </p>
        </div>

        {/* ảnh & Album */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Ảnh & Album</h2>
          <input type="file"
            accept="image/*"
            className="hidden" />
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Tải ảnh lên
          </button>

        </div>

        {/* cài đặt */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Cài đặt hồ sơ</h2>
          <p>Thay đổi mật khẩu </p>
        </div>

        {/* xác minh tài khoản */}
        <div className="mt-4 text-gray-800">
          <h2 className="text-lg font-semibold">Xác minh tài khoản</h2>
          <p>Trạng thái xác minh: <span className="text-green-500">Đã xác minh</span></p>
        </div>

        {/* Nút chỉnh sửa & lưu */}
        <button
          onClick={() => setIsUpdate(!isUpdate)}
          className="mt-4 w-full py-2 bg-amber-300 rounded-2xl text-lg font-semibold"
        >
          {isUpdate ? "Lưu" : "Chỉnh sửa"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
