import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { deleteAccountById, getAllAccounts, updatStatusAccount, } from "../../../service/adminService";
import { Accept } from "../../popup/Accept";
import Alert from "../../alert/Alert";

const AccManager = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getAccounts = async () => {
    try {
      const res = await getAllAccounts(currentPage, 10);
      setData(res.data);
      setTotalPages(Math.ceil(res.totalRecords / 10));
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAccounts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      setPopup(true);
      await deleteAccountById(id);
      setSuccess("Xoá tài khoản thành công");
      setData(data.filter((account) => account.id !== id));
      setPopup(false);
    } catch (error) {
      setError("Lỗi khi xoá tài khoản");
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? 0 : 1;
      await updatStatusAccount(id, newStatus);
      setData((prevData) =>
        prevData.map((account) =>
          account.id === id ? { ...account, status: newStatus } : account
        )
      );
      setSuccess(newStatus ? "Mở khóa tài khoản thành công" : "Khóa tài khoản thành công");
    } catch (error) {
      setError("Lỗi khi cập nhật trạng thái tài khoản");
    }
  };




  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      {error && <Alert type={'error'} message={error} onClose={() => setError('')} />}
      {success && <Alert type={'success'} message={success} onClose={() => setSuccess('')} />}
      {popup && <Accept action={"xoá"}
        isReject={() => setPopup(false)}
        isAccept={() => handleDelete(selectedId)} />}

      <h1 className="pb-6 font-bold text-3xl text-center text-gray-800">Quản Lý Tài Khoản</h1>

      <div className="overflow-x-auto bg-white shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">ID</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Số điện thoại</th>
              <th className="border p-3">Trạng thái</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border p-3">{row.id}</td>
                  <td className="border p-3">{row.email}</td>
                  <td className="border p-3">{row.phone}</td>
                  <td className={row.status === 1 ? 'text-green-500 border p-3 border-black' : ' border-black text-red-500 border p-3'}>{row.status === 1 ? "Active" : "Blocked"}</td>
                  <td className="border p-3">{row.role}</td>
                  <td className="border p-3">
                    {!row.role.includes("role_admin") &&
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => handleUpdateStatus(row.id, row.status)}
                          className={`font-medium p-2 rounded-xl transition-colors duration-200 ${row.status === 1
                            ? "bg-amber-500 hover:bg-amber-200 text-white"
                            : "bg-green-500 hover:bg-green-200 text-white"
                            }`
                          }
                        >
                          {row.status === 1 ? "Block" : "Unblock"}
                        </button>

                        <button onClick={() => {
                          setPopup(true),
                            setSelectedId(row.id)
                        }} className="text-white hover:text-red-800 font-medium p-2 hover:bg-red-200 bg-red-500 rounded-xl">
                          Delete
                        </button>
                      </div>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-3 text-center text-gray-500">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default AccManager;
