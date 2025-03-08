
import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { getUserLogin } from "../../service/userService";
import { IoClose } from "react-icons/io5";


const AddImages = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [infoUser, setInfoUser] = useState([]);

    const getUser = async () => {
        try {
            const response = await getUserLogin();
            setInfoUser(response.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        getUser();
    }
        , []);

    return (
        <div className="flex flex-col w-99 h-160 bg-transparent rounded-xl shadow-lg border border-black">
            {!isEdit ? <>
                <div className="w-full pl-6 py-4 flex bg-[#21272b] items-center rounded-tr-xl rounded-tl-xl">
                    <p className="text-2xl font-bold text-pink-500 mr-3">{infoUser.full_name}</p>
                    <p className="text-gray-300 text-xl mr-3">{infoUser.age}</p>
                    <FaCheckCircle className="text-gray-500" />
                </div>
                <div className=" w-full h-140 bg-cover bg-center flex items-end"
                    style={{ backgroundImage: `url(hinh2.png)` }}>

                </div>
            </> :
                <>
                    <div className="w-full pl-6 py-4 flex justify-center bg-[#21272b] items-center rounded-tr-xl rounded-tl-xl">
                        <p className="text-2xl font-bold text-pink-500 mr-3">Ảnh hồ sơ</p>

                    </div>
                    <div className="grid grid-cols-3 gap-4 flex-[8] bg-[#21272b]">
                        <div className="w-28 h-32 mx-auto rounded-xl relative">
                            <img
                                src={infoUser.avatar_url || "/default.jpg"}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-xl"

                            />
                            <div className="absolute top-0 right-0 flex gap-2 p-2">

                                <IoClose className="text-gray-300 cursor-pointer hover:text-red-500" />
                            </div>
                        </div>

                        <div className="w-28 h-32 mx-auto rounded-xl relative bg-gray-600">
                            <div className="absolute top-0 right-0 flex gap-2 p-2">
                                <FaPlus className="text-red-500 cursor-pointer hover:text-gray-300" />
                            </div>
                        </div>


                    </div>
                </>}
            <div className="flex justify-center p-4 bg-[#21272b] rounded-bl-xl rounded-br-xl">
                <button onClick={() => setIsEdit(!isEdit)} className="px-4 py-2 text-white bg-gradient-to-bl from-[#FD2B75] to-[#FF5D3A] rounded-2xl">
                    {isEdit ? "Lưu" : "Chỉnh sửa"}
                </button>
            </div>
        </div>
    );
};
export default AddImages;