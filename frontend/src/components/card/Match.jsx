
const Match = ({ user1Image, user2Image, matchedUserName, status, isReject, isAccept }) => {
    return (
        <div className="relative z-50 flex flex-col rounded-2xl items-center justify-center w-full h-full bg-gradient-to-b from-green-600 to-green-90">
            {/* Nút X ở góc trên bên trái */}
            <button onClick={isReject} className="absolute top-4 left-4 text-white text-2xl font-bold">
                ✕
            </button>
            <div className="relative top-1/2 -translate-y-full flex items-center justify-center">

                <div className="relative w-40 h-40 bg-green-400 rotate-45
            before:content-[''] before:absolute before:w-full before:h-full before:bg-green-400 before:rounded-full before:top-0 before:-left-[50%]
            after:content-[''] after:absolute after:w-full after:h-full after:bg-green-400 after:rounded-full after:-top-[50%] after:left-0">
                    <div className="translate-3 relative animate-ping w-32 h-32 bg-red-400 z-20
            before:content-[''] before:absolute before:w-full before:h-full before:z-20 before:bg-red-400 before:rounded-full before:top-0 before:-left-[50%]
            after:content-[''] after:absolute after:w-full after:h-full after:z-20 after:bg-red-400 after:rounded-full after:-top-[50%] after:left-0"></div>
                </div>

            </div>
            {/* Hai hình ảnh tròn */}
            <div className="relative flex space-x-[-40px] z-10">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-300">
                    <img
                        src={user1Image}
                        alt="User 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-300">
                    <img
                        src={user2Image}
                        alt="User 2"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <p className="mt-4 text-lg text-white font-medium">
                Bạn kết nối với {matchedUserName}
            </p>
            {/* Văn bản "IT'S A MATCH" */}
            <h1 className="mt-8 text-2xl font-extrabold text-white text-center tracking-wider drop-shadow-lg">
                {(status === 1 || status === 2) ? "BẠN CÓ MUỐN HUỶ KẾT NỐI KHÔNG?" 
                : "BẠN CÓ MUỐN GỬI YÊU CẦU KẾT NỐI KHÔNG?"}
            </h1>
            {/* Nút "SEND REQUEST" */}
            <button onClick={isAccept} className="mt-8 px-6 py-2 bg-white text-green-600 font-semibold rounded-full shadow-lg hover:bg-green-200 transition duration-300">
                {(status === 1 || status === 2) ? "HUỶ KẾT NỐI" : "GỬI YÊU CẦU"}
            </button>
            {/* Nút "DISMISS" */}
            <button onClick={isReject} className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-500 transition duration-300">
                BỎ QUA
            </button>

        </div>
    );
};

export default Match;