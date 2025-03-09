import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { changePassword, getUserLogin } from "../../service/userService";
import Alert from "../../components/alert/Alert";
import { isMatch, validatePassword } from "../../validator/appValidate";

const Profile = () => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({
    full_name: "",
    age: "",
    gender: "",
    occupation: "",
    hobbies: "",
    bio: "",
    criteria: "",
    address: "",
    avatar_url: "",
  });

  const getInfo = async () => {
    try {
      const res = await getUserLogin();
      setData(res.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!isMatch(dataUpdate.newPassword, dataUpdate.confirmPassword)) {
        setError("Mật khẩu không khớp");
        return;
      }
      if (!validatePassword(dataUpdate.newPassword)) {
        setError("Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số!");
        return;
      }
      const res = await changePassword(dataUpdate);
      setIsChangePassword(false);
      setSuccess(res.message);
    } catch (error) {
      setError(error.response.data.message);

    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {error && <Alert type={'error'} message={error} onClose={() => setError('')} />}
      {success && <Alert type={"success"} message={success} onClose={() => setSuccess("")} />}
      <div className="flex justify-center items-center min-h-screen bg-transparent">

        <div className="relative w-96 bg-white rounded-3xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
          {/* ảnh đại diện */}
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={data.avatar_url || "/default.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "/default.jpg"; }}
            />
          </div>

          {/* Thông tin cá nhân */}
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
              value={data.bio || ""}
            />
            <p><strong>Tiêu chuẩn tìm kiếm:</strong>{data.criteria}</p>
            <p><strong>Vị trí hiện tại:</strong> {data.address} </p>
          </div>

          {/* Ảnh & Album */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold">Ảnh & Album</h2>
            <input type="file" accept="image/*" className="hidden" />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Tải ảnh lên
            </button>
          </div>

          {/* Xác minh tài khoản */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold">Xác minh tài khoản</h2>
            <p>Trạng thái xác minh: <span className="text-green-500">Đã xác minh</span></p>
          </div>

          {/* Cài đặt */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold pb-2 border-b border-gray-200">Cài đặt hồ sơ</h2>
            {isChangePassword && (
              <>
                <div className="mt-2 mb-6 border-gray-200">
                  <label className="block text-gray-700 font-semibold mb-1">Mật khẩu cũ</label>
                  <input
                    type="text"
                    onChange={(e) => setDataUpdate({ ...dataUpdate, oldPassword: e.target.value })}
                    placeholder={'Nhập mật khẩu cũ'}
                    className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 focus:outline-none"
                  />
                </div>
                <div className="mb-6 border-gray-200">
                  <label className="block text-gray-700 font-semibold mb-1">Mật khẩu mới</label>
                  <input
                    type="text"
                    onChange={(e) => setDataUpdate({ ...dataUpdate, newPassword: e.target.value })}
                    placeholder={'Nhập mật khẩu mới'}
                    className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 focus:outline-none"
                  />
                </div>
                <div className="mb-6 border-gray-200">
                  <label className="block text-gray-700 font-semibold mb-1">Xác nhận mật khẩu</label>
                  <input
                    type="text"
                    onChange={(e) => setDataUpdate({ ...dataUpdate, confirmPassword: e.target.value })}
                    placeholder={'Nhập lại mật khẩu mới'}
                    className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex justify-between border-t pt-4 border-gray-200">
              <button onClick={() => {
                isChangePassword ? handleChangePassword() : setIsChangePassword(true);
              }}
                className="p-2 bg-red-300 hover:bg-red-200 rounded-xl font-semibold" >
                {isChangePassword ? "Cập nhật" : "Đổi mật khẩu"}
              </button>
              <button onClick={() => setIsUpdate(!isUpdate)}
                className="p-2 bg-amber-300 hover:bg-amber-200 rounded-xl font-semibold" >
                {isUpdate ? "Lưu" : "Chỉnh sửa"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default Profile;
