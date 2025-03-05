import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAccount } from "../../../service/adminService";
import { changePassword } from "../../../service/userService";
import { isMatch, validatePassword } from "../../../validator/appValidate";
import Alert from "../../alert/Alert";

const Info = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataUpdate, setDataUpdate] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChangePassword = async () => {
        try {
            if (!isMatch(dataUpdate.newPassword, dataUpdate.confirmPassword)) {
                setError("Mật khẩu không khớp");
                return;
            }
            if (!validatePassword(dataUpdate.newPassword)) {
                setError("Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số!");
                return ;
            }
            await changePassword(dataUpdate);
            setIsUpdate(false);
            setSuccess("Đổi mật khẩu thành công");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const getAdminInfo = async () => {
        try {
            const res = await getAccount();
            setInfo(res.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        getAdminInfo();
    }, [])


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            {error && <Alert type={'error'} message={error} onClose={() => setError('')} />}
            {success && <Alert type={'success'} message={success} onClose={() => setSuccess('')} />}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3 border-gray-200">
                <FontAwesomeIcon icon={faUserShield} className="text-[#FA5A7C]" />
                Thông tin Admin
            </h2>

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                    Tài khoản:
                </label>
                <input
                    disabled
                    value={info.email || ""}
                    type="text"
                    id="email"
                    className="w-full p-3 border rounded-md bg-red-100 text-green-700 font-bold focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
            </div>

            <div className="mb-6 border-gray-200">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="role">
                    Quyền:
                </label>
                <input
                    disabled
                    value={info.role || ""}
                    type="text"
                    id="role"
                    className="w-full font-bold p-3 border rounded-md bg-red-100 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>
            <div className="mb-6 border-gray-200">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="created_at">
                    Ngày tạo:
                </label>
                <input
                    disabled
                    value={info.created_at || ""}
                    type="text"
                    id="created_at"
                    className="w-full font-bold p-3 border rounded-md bg-red-100 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>
            <div className="mb-6 border-gray-200">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="updated_at">
                    Ngày cập nhật:
                </label>
                <input
                    disabled
                    value={info.updated_at || ""}
                    type="text"
                    id="updated_at"
                    className="w-full font-bold p-3 border rounded-md bg-red-100 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>

            {isUpdate && (
                <>
                    <div className="mb-6 border-gray-200">
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

            <div className="flex justify-center border-t pt-4 border-gray-200">
                {!isUpdate ?
                    <button
                        onClick={() => setIsUpdate(!isUpdate)}
                        className="rounded-xl px-4 py-2 bg-[#dcfceb] text-amber-700 font-semibold hover:bg-amber-200 transition"
                    >
                        Đổi mật khẩu
                    </button> :
                    <button
                        onClick={handleChangePassword}
                        className="rounded-xl px-4 py-2 bg-[#dcfceb] text-amber-700 font-semibold hover:bg-amber-200 transition"
                    >
                        Xác nhận
                    </button>
                }
            </div>
        </div>
    );

};
export default Info;