import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { changePassword, getUserLogin, updateUserProfile } from "../../service/userService";
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
  // Thêm state để lưu dữ liệu chỉnh sửa
  const [editData, setEditData] = useState({ ...data });

  const getInfo = async () => {
    try {
      const res = await getUserLogin();
      setData(res.data);
      setEditData(res.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };
  // Hàm xử lý cập nhật thông tin
  const handleUpdateProfile = async () => {
    try {
      const res = await updateUserProfile(data); // Gửi editdata lên server
      setSuccess("Hồ sơ đã được cập nhật!");
      setData(editData); //cập nhật lại data sau khi lưu
      setIsUpdate(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      setError("Lỗi khi cập nhật hồ sơ: " + error.response?.data?.message || error.message);
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
              {isUpdate ? (
                <input
                  type="text"
                  className="border p-1 rounded"
                  value={editData.full_name}
                  onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                />
              ) : (
                data.full_name
              )}

              ,{" "}
              {isUpdate ? (
                <input
                  type="number"
                  className="border p-1 rounded w-16"
                  value={editData.age}
                  onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                />
              ) : (
                data.age
              )}
              <FaCheckCircle className="text-blue-500" />
            </h1>

            <p>
              <strong>Giới tính:</strong>{" "}
              {isUpdate ? (
                <select
                  className="border p-1 rounded"
                  value={editData.gender}
                  onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : (
                data.gender
              )}
            </p>

            <p>
              <strong>Nghề nghiệp:</strong>{" "}
              {isUpdate ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full"
                  value={editData.occupation}
                  onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                />
              ) : (
                data.occupation
              )}
            </p>

            <p>
              <strong>Sở thích:</strong>{" "}
              {isUpdate ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full"
                  value={editData.hobbies}
                  onChange={(e) => setEditData({ ...editData, hobbies: e.target.value })}
                />
              ) : (
                data.hobbies
              )}
            </p>
          </div>

          {/* Hồ sơ */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold">Hồ sơ chi tiết</h2>
            <p><strong>Mô tả bản thân:</strong></p>
            <input
              className="outline p-2 border border-gray-300 rounded-lg w-full"
              type="text"
              disabled={!isUpdate}
              value={editData.bio || ""}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
            />

            <p><strong>Tiêu chuẩn tìm kiếm:</strong></p>
            <input
              className="outline p-2 border border-gray-300 rounded-lg w-full"
              type="text"
              disabled={!isUpdate}
              value={editData.criteria || ""}
              onChange={(e) => setEditData({ ...editData, criteria: e.target.value })}
            />

            <p><strong>Vị trí hiện tại:</strong></p>
            <input
              className="outline p-2 border border-gray-300 rounded-lg w-full"
              type="text"
              disabled={!isUpdate}
              value={editData.address || ""}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
            />
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
              <button onClick={() => {
                if (isUpdate) handleUpdateProfile(); // Lưu thông tin khi bấm Lưu
                setIsUpdate(!isUpdate);
              }}
                className="p-2 bg-amber-300 hover:bg-amber-200 rounded-xl font-semibold">
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