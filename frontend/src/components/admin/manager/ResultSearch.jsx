const ResultSearch = ({ data, keyword }) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <h1 className="pb-6 font-bold text-3xl text-center text-gray-800">Kết quả tìm kiếm cho từ khoá {keyword}</h1>

      <div className="overflow-x-auto bg-white shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">ID</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Số điện thoại</th>
              <th className="border p-3">Trạng thái</th>
              <th className="border p-3">Role</th>
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
    </div>
  );
}

export default ResultSearch;
