import { Outlet } from "react-router-dom";
import Left from "../../components/admin/menu/Left";
function Dashboard() {
  
    return (
        <div className="flex h-screen bg-gray-100">
            <Left />
            <div className="absolute left-64 p-6 min-h-screen w-[calc(100%-16rem)]">
                <Outlet/>  
            </div>

        </div>
    );
}

export default Dashboard;