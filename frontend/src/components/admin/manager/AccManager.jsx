<<<<<<< HEAD
import { useState } from "react";

=======
import { useEffect, useState } from "react";
>>>>>>> 3bdbc2632dea5c4f8b3416dcc61c1779583b8ef4
import Pagination from "../pagination/Pagination";
import { getAllAccounts } from "../../../service/adminService";


function AccManager() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAccounts = async () => {
    try {
      const res = await getAllAccounts();
      setData(
        res.data.map(item => ({
          ...item,
        }))
      );
      const totalPages = Math.ceil(res.total / 10);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getAccounts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <div className="flex-1">
        <h1 className="pb-6 font-bold text-3xl text-center text-gray-800">
          Quản Lý Tài Khoản
        </h1>

        <div className="overflow-x-auto bg-white  shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left text-gray-700 font-semibold">ID</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Số điện thoại</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Trạng thái</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Ngày tạo</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Ngày cập nhật</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border p-3">{row.id}</td>
                    <td className="border p-3">{row.email}</td>
                    <td className="border p-3">{row.phone}</td>
                    <td className="border p-3">{row.status === 1 ? "active" : "block"}</td>
                    <td className="border p-3">{row.role}</td>
                    <td className="border p-3">{formatDate(row.created_at)}</td>
                    <td className="border p-3">{formatDate(row.updated_at)}</td>
                    <td className="border p-3">
                      <div className="flex gap-4 justify-center">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 font-medium">
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
  );
}

export default AccManager;