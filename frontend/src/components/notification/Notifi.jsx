import { useState, useEffect } from "react";
import { getMatchById, updateMatchRequestStatus } from "../../service/matchServie";


const Notifi = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchMatchRequests = async () => {
        try {
            setLoading(true);
            const response = await getMatchById();
            console.log(response);
            setRequests(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatchRequests();
        const interval = setInterval(fetchMatchRequests, 5000); // Polling mỗi 5 giây
        return () => clearInterval(interval);
    }, []);

    const handleAccept = async (matchId) => {
        try {
           const res = await updateMatchRequestStatus(matchId, 2);
           console.log(res);
            fetchMatchRequests(); // Cập nhật lại danh sách
           
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReject = async (matchId) => {
        try {
           const res = await updateMatchRequestStatus(matchId, 0);
           console.log(res);
            fetchMatchRequests(); // Cập nhật lại danh sách
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="text-black text-center">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-[400px] h-[90%] border-2 bg-white rounded-2xl overflow-hidden">

                <h2 className="text-2xl text-center font-bold text-black mb-4">Yêu cầu ghép đôi</h2>
                {requests.length === 0 ? (
                    <p className="text-black text-center">Không có yêu cầu ghép đôi nào.</p>
                ) : (
                    <ul className="space-y-4">
                        {requests.map((request) => (
                            <li
                                key={request.id}
                                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={request.avatar_url || "/default.jpg"}
                                        alt={request.full_name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <span className="text-black font-semibold">{request.full_name}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleAccept(request.id)}
                                        className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600"
                                    >
                                        Chấp nhận
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600"
                                    >
                                        Từ chối
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Notifi;