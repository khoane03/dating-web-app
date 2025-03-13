import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { changePassword, getUserLogin, updateUserProfile, avatarUpdate } from "../../service/userService";
import Alert from "../../components/alert/Alert";
import { isMatch, validatePassword } from "../../validator/appValidate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
    dob: "",
    age: "",
    gender: "",
    occupation: "",
    hobbies: "",
    bio: "",
    criteria: "",
    avatar_url: "",
  });
  // Thêm state để lưu dữ liệu chỉnh sửa
  const [editData, setEditData] = useState({ ...data });
  const [avatar, setAvatar] = useState(null);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  // Fetch user info from API
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
      await handleUploadImage(); // Tải ảnh lên trước khi cập nhật thông tin
      await updateUserProfile(editData);
      setSuccess("Hồ sơ đã được cập nhật!");
      setData(editData); //cập nhật lại data sau khi lưu
      setIsUpdate(false); // Tắt chế độ chỉnh sửa sau khi lưu thành công
    } catch (error) {
      setError("Lỗi khi cập nhật hồ sơ: " + error.response?.data?.message || error.message);
    }
  };

  // Hàm chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setEditData({ ...editData, avatar_url: URL.createObjectURL(file) }); // Hiển thị ảnh đã chọn
    }
  };

  // Hàm tải ảnh lên
  const handleUploadImage = async () => {
    if (!avatar) {
      setError("Vui lòng chọn ảnh cần tải lên!");
      return;
    }
    const formData = new FormData();
    formData.append("id", data.id); // Thêm id vào form data
    formData.append("avatar", avatar); //  Thêm ảnh vào form data
    try {
      
      const res = await avatarUpdate(formData);
      console.log("Kết quả tải ảnh lên:", res);
      setSuccess("Tải ảnh lên thành công!");
      setData({ ...data, avatar_url: res.data.avatar_url }); //  Cập nhật lại ảnh mới
    } catch (error) {
      setError("Lỗi khi tải ảnh lên: " + error.response?.data?.message || error.message);
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

  const getAddress = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const address = res.data.display_name;
      console.log("Địa chỉ:", address);
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Vị trí hiện tại:", latitude, longitude);
          getAddress(latitude, longitude);
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        }
      );
    } else {
      console.error("Geolocation không được hỗ trợ bởi trình duyệt này.");
    }
  };

  useEffect(() => {
    getInfo();
  }, [isUpdate]);

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
       {/* Thêm nút chọn ảnh */}
          {
            isUpdate && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="avatar"
                  className="block text-center bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400"
                >
                  Chọn ảnh
                </label>
              </div>
            )
          }
          {/* Thông tin cá nhân */}
          <div className="text-center mt-4 text-gray-800">
            <div className="flex items-center justify-center">
              {isUpdate ? <input
                type="text"
                className="font-semibold text-center focus:ring focus:ring-blue-300"
                value={editData.full_name || ""}
                onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
              /> : <span className="text-3xl font-semibold">{data.full_name}</span>}
              <div className="flex items-center">
                <span className="mr-2 text-2xl font-bold">, {data.age}</span>
                <FaCheckCircle className="text-green-500 text-2xl" />
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <p className="flex justify-center items-center gap-2">
                <strong>Giới tính:</strong>
                {isUpdate ? (
                  <select
                    className="border p-1 rounded focus:ring focus:ring-blue-300"
                    value={editData.gender}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                ) : (
                  <span>{data.gender}</span>
                )}
              </p>

              <p>
                <strong>Nghề nghiệp:</strong>{" "}
                {isUpdate ? (
                  <input
                    type="text"
                    className="border p-1 rounded w-full focus:ring focus:ring-blue-300"
                    value={editData.occupation}
                    onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                  />
                ) : (
                  <span>{data.occupation}</span>
                )}
              </p>

              <p>
                <strong>Sở thích:</strong>{" "}
                {isUpdate ? (
                  <input
                    type="text"
                    className="border p-1 rounded w-full focus:ring focus:ring-blue-300"
                    value={editData.hobbies}
                    onChange={(e) => setEditData({ ...editData, hobbies: e.target.value })}
                  />
                ) : (
                  <span>{data.hobbies}</span>
                )}
              </p>
            </div>
          </div>

          {/* Hồ sơ chi tiết */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold mb-2">Hồ sơ chi tiết</h2>

            <p className="mb-1"><strong>Ngày sinh:</strong></p>
            <input
              type="date"
              className="outline p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300"
              disabled={!isUpdate}
              value={formatDate(editData.dob) || ""}
              onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
            />

            <p className="mb-1"><strong>Mô tả bản thân:</strong></p>
            <textarea
              className="outline p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300"
              disabled={!isUpdate}
              value={editData.bio || ""}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
            />

            <p className="mt-2 mb-1"><strong>Tiêu chuẩn tìm kiếm:</strong></p>
            <textarea
              className="outline p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300"
              disabled={!isUpdate}
              value={editData.criteria || ""}
              onChange={(e) => setEditData({ ...editData, criteria: e.target.value })}
            />

            <div className="flex items-center mt-2">
              <span className="font-bold mr-2">Vị trí hiện tại: {data.address}</span>
              <FontAwesomeIcon onClick={() => { getLocation(); }}
                icon={faLocationDot} className="hover:text-blue-400 cursor-pointer text-2xl" />
            </div>

          </div>


          {/* Xác minh tài khoản */}
          <div className="mt-4 text-gray-800">
            <h2 className="text-lg font-semibold">Xác minh tài khoản</h2>
            <p>Trạng thái xác minh: <span className="text-green-500">Đã xác minh</span></p>
          </div>
          {/*Cài đặt hồ sơ*/}
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