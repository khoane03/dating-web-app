
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlus } from "react-icons/fa";
import { getUserLogin } from "../../service/userService";
import { IoClose } from "react-icons/io5";
import { Accept } from "../popup/Accept";


const AddImages = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [infoUser, setInfoUser] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const avatar_url = ['hinh1.png', 'hinh2.png', 'avatar.png', 'default.jpg'];
    const [isAccept, setIsAccept] = useState(false);

    const getUser = async () => {
        try {
            const response = await getUserLogin();
            setInfoUser(response.data);
        } catch (error) {

        }
    };

    const handleButton = (action) => {
        if (action === "preview") {
            if (selectedIndex === 0) return setSelectedIndex(avatar_url.length - 1);
            setSelectedIndex(selectedIndex - 1);

        } else {
            if (selectedIndex === avatar_url.length - 1) return setSelectedIndex(0);
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handleDeleteImageById = async () => {
        console.log("Xoá ảnh có id");
        setTimeout(() => {
            setIsAccept(false);
        }
            , 1000);
    }

    useEffect(() => {
        getUser();
    }
        , []);

    return (
        <div className="flex flex-col w-99 h-160 bg-transparent rounded-xl shadow-lg border border-black">
            {isAccept && <Accept action={"xoá"} isAccept={handleDeleteImageById} isReject={() => setIsAccept(false)} />}
            {!isEdit ? <>
                <div className="w-full pl-6 py-4 flex bg-[#21272b] items-center rounded-tr-xl rounded-tl-xl">
                    <p className="text-2xl font-bold text-pink-500 mr-3">{infoUser.full_name}</p>
                    <p className="text-gray-300 text-xl mr-3">{infoUser.age}</p>
                    <FaCheckCircle className="text-gray-500" />
                </div>
                <div className="w-full h-140 bg-cover bg-center flex flex-col items-center group/button"
                    style={{ backgroundImage: `url(${avatar_url[selectedIndex]})` }}>

                    <div className="mt-2 flex justify-around w-full h-2 bg-[#434B54] rounded-3xl pl-2">
                        {avatar_url.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full h-2 border rounded-3xl mr-2 transition ${selectedIndex === index ? "bg-white" : "bg-gray-500 hover:bg-white"
                                    }`}
                            />
                        ))}

                    </div>
                    <div className=" justify-between w-full p-2 mt-10 hidden group-hover/button:flex">
                        <button onClick={() => handleButton('preview')}>
                            <FaArrowLeft className="text-2xl text-black hover:text-gray-200" />
                        </button>
                        <button onClick={() => handleButton('next')}>
                            <FaArrowRight className="text-2xl text-black hover:text-gray-200" />
                        </button>
                    </div>
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
                                <IoClose onClick={() => setIsAccept(true)}
                                    className="text-gray-300 text-2xl cursor-pointer hover:text-red-500" />
                            </div>
                        </div>

                        <div className="w-28 h-32 mx-auto rounded-xl relative bg-gray-600">
                            <div className="absolute top-0 right-0 flex gap-2 p-2">
                                <label htmlFor="file">
                                    <FaPlus className="text-red-500 cursor-pointer hover:text-gray-300 text-2xl" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"

                                />

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