import { useEffect, useState } from "react";
import { deleteMatchById, getMatchedUsers } from "../../../service/adminService";
import Pagination from "../pagination/Pagination";
import { Accept } from "../../popup/Accept";
import Alert from "../../alert/Alert";


function MatchesManager() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const getMatches = async () => {
    try {
      const res = await getMatchedUsers();
      setData(
        res.data.map((item) => ({
          ...item,
        }))
      );
      const totalPages = Math.ceil(res.total / 10);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    try {
      console.log('called');
      await deleteMatchById(id);
      setData(data.filter((item) => item.id !== id));
      setSuccess("Xoá match thành công");
      setPopup(false);
    } catch (error) {
      setError("Lỗi khi xoá match");
    }
  };

  useEffect(() => {
    getMatches();
  }, [])
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      {error && <Alert type={'error'} message={error} onClose={() => setError('')} />}
      {success && <Alert type={'success'} message={success} onClose={() => setSuccess('')} />}
      {popup && <Accept action={"xoá"}/>}
      <div className="flex-1">
        <h1 className="pb-6 font-bold text-3xl text-center text-gray-800">
          Quản Lý Tài Khoản
        </h1>

        <div className="overflow-x-auto bg-white  shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-2">ID</th>
                <th className="border p-2 w-auto">Người dùng 1</th>
                <th className="border p-2 w-auto">Người dùng 2</th>
                <th className="border p-2 w-auto">Trạng thái</th>
                <th className="border p-2 w-auto">Ngày tạo</th>
                <th className="border p-2 w-auto">Ngày cập nhật</th>
                <th className="border p-2 w-auto">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border p-3">{row.id}</td>
                    <td className="border p-3">{row.user_a}</td>
                    <td className="border p-3">{row.user_b}</td>
                    <td className="border p-3">{row.status === 1 ? "matched" : "Pending"}</td>
                    <td className="border p-3">{formatDate(row.matched_at)}</td>
                    <td className="border p-3">{formatDate(row.updated_at)}</td>
                    <td className="border p-3">
                      <div className="flex gap-4 justify-center">
                        <button onClick={()=>{
                          setPopup(true);
                          handleDelete(row.id);
                        }}
                         className="text-white font-medium p-2 hover:bg-red-200 bg-red-500 rounded-xl">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border p-3 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
export default MatchesManager;