import { useState } from "react";

import Pagination from "../pagination/Pagination";


function AccManager() {


  const data = Array.from({ length: 10 }, (_, rowIndex) => ({
    id: rowIndex + 1,
    email: `user${rowIndex + 1}@example.com`,
    phone: `098765432${rowIndex}`,
    status: rowIndex % 2 === 0 ? "Active" : "Inactive",
    created_at: "2021-10-10",
    updated_at: "2021-10-10",
    role: rowIndex % 2 === 0 ? "Admin" : "User",
    action: (
      <div className="flex gap-4">
        <button className="text-blue-500">Edit</button>
        <button className="text-red-500">Delete</button>
      </div>
    ),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col justify-betweens">
      <div className="flex-10" >
        <h1 className="pb-6 font-bold text-3xl text-center">Quản lý ghép đôi</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-2 w-2">ID</th>
              <th className="border p-2 w-auto">Email</th>
              <th className="border p-2 w-auto">Số điện thoại</th>
              <th className="border p-2 w-auto">Trạng thái</th>
              <th className="border p-2 w-auto">Role</th>
              <th className="border p-2 w-auto">Ngày tạo</th>
              <th className="border p-2 w-auto">Ngày cập nhật</th>
              <th className="border p-2 w-auto">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.email}</td>
                <td className="border p-2">{row.phone}</td>
                <td className="border p-2">{row.status}</td>
                <td className="border p-2">{row.role}</td>
                <td className="border p-2">{row.created_at}</td>
                <td className="border p-2">{row.updated_at}</td>
                <td className="border p-2">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <Pagination currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}

        />
      </div>
    </div>
  )
}

export default AccManager;