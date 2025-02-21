

function MatchesManager() {

    const data = Array.from({ length: 10 }, (_, rowIndex) => ({
        id: rowIndex + 1,
        user1: `name${rowIndex + 1}`,
        user2: `name${rowIndex}`,
        status: rowIndex % 2 === 0 ? "Matched" : "Cancel",
        created_at: "2021-10-10",
        updated_at: "2021-10-10",
        action: (
          <div className="flex gap-4">
            <button className="text-blue-500">Edit</button>
            <button className="text-red-500">Delete</button>
          </div>
        ),
      }));
    
    
       return(
             <div>
                  <h1 className="pb-6 font-bold text-3xl text-center">Quản lý tài khoản</h1>
                  <table className="w-full">
                    <thead>
                        <tr>
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
                      {data.map((row) => (
                        <tr key={row.id}>
                          <td className="border p-2">{row.id}</td>
                          <td className="border p-2">{row.user1}</td>
                          <td className="border p-2">{row.user2}</td>
                          <td className="border p-2">{row.status}</td>
                          <td className="border p-2">{row.created_at}</td>
                          <td className="border p-2">{row.updated_at}</td>
                          <td className="border p-2">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
             </div>
       )
    }
export default MatchesManager;