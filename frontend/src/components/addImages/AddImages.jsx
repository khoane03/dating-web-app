
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlus } from "react-icons/fa";
import { getUserLogin } from "../../service/userService";
import { IoClose } from "react-icons/io5";
import { Accept } from "../popup/Accept";
import { deletePostById, getPostByUserId } from "../../service/postService";
import Alert from "../alert/Alert";
import FormAdd from "./formAdd";


const AddImages = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [infoUser, setInfoUser] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAccept, setIsAccept] = useState(false);
    const [posts, setPosts] = useState([]);
    const idPost = useRef(null);
    const [isHidden, setIsHidden] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleButton = (action) => {
        if (action === "preview") {
            if (selectedIndex === 0) return setSelectedIndex(posts.length - 1);
            setSelectedIndex(selectedIndex - 1);

        } else {
            if (selectedIndex === posts.length - 1) return setSelectedIndex(0);
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handleDeleteImageById = async () => {
        try {
            const res = await deletePostById(idPost.current);
            if (res.code === 200) {
                setSuccess('Xoá ảnh thành công!');
                const newPosts = posts.filter(post => post.id !== idPost.current);
                setPosts(newPosts);
            }
            setTimeout(() => {

                setIsAccept(false);
            }
                , 1000);
        } catch (error) {
            setError('Xoá ảnh thất bại!');
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserLogin();
                setInfoUser(response.data);

                const res = await getPostByUserId(response.data.id);
                setPosts(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy user:", error);
            }
        };

        fetchUser();
    }, []);
    return (
        <div className="flex flex-col w-99 h-160 bg-transparent rounded-xl shadow-lg border border-black">
            {success && <Alert type={'success'} message={success} onClose={() => { setSuccess('') }} />}
            {error && <Alert type={'error'} message={error} onClose={() => { setError('') }} />}
            {isAccept && <Accept action={"xoá"} isAccept={handleDeleteImageById} isReject={() => setIsAccept(false)} />}
            {isHidden && <FormAdd onClose={() => { setIsHidden(false) }} />}
            {!isEdit ? <>
                <div className="w-full pl-6 py-4 flex bg-[#21272b] items-center rounded-tr-xl rounded-tl-xl">
                    <p className="text-2xl font-bold text-pink-500 mr-3">{infoUser.full_name}</p>
                    <p className="text-gray-300 text-xl mr-3">{infoUser.age}</p>
                    <FaCheckCircle className="text-gray-500" />
                </div>
                <div className="w-full h-140 bg-cover bg-center flex flex-col items-center group/button"
                    style={{ backgroundImage: `url(${posts[selectedIndex]?.image_url || ""})` }}>

                    <div className="mt-2 flex justify-around w-full h-2 bg-[#434B54] rounded-3xl pl-2">
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full h-2 border rounded-3xl mr-2 transition ${selectedIndex === index ? "bg-white" : "bg-gray-500 hover:bg-white"
                                    }`}
                            />
                        ))}

                    </div>
                    {posts.length &&
                        <div className=" justify-between w-full p-2 mt-10 hidden group-hover/button:flex">
                            <button onClick={() => handleButton('preview')}>
                                <FaArrowLeft className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
                            </button>
                            <button onClick={() => handleButton('next')}>
                                <FaArrowRight className="border-2 text-4xl p-2 bg-gray-700 rounded-full hover:bg-white hover:text-black text-white" />
                            </button>
                        </div>
                    }
                </div>
            </>
                :
                <>
                    <div className="w-full pl-6 py-4 flex justify-center bg-[#21272b] items-center rounded-tr-xl rounded-tl-xl">
                        <p className="text-2xl font-bold text-pink-500 mr-3">Ảnh hồ sơ</p>

                    </div>
                    <div className="grid grid-cols-3 gap-4 flex-[8] bg-[#21272b]">
                        {posts.map((post, index) =>
                        (
                            <div key={index} className="w-28 h-32 mx-auto rounded-xl relative">
                                <img
                                    src={post.image_url || "/default.jpg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute top-0 right-0 flex gap-2 p-2">
                                    <IoClose onClick={() => {
                                        setIsAccept(true);
                                        idPost.current = post.id;
                                    }} className="text-gray-300 text-2xl cursor-pointer hover:text-red-500" />
                                </div>
                            </div>
                        ))}
                        <div className="w-28 h-32 mx-auto rounded-xl relative bg-gray-600">
                            <div className="absolute top-0 right-0 flex gap-2 p-2">
                                <FaPlus onClick={() => { setIsHidden(true) }} className="text-red-500 cursor-pointer hover:text-gray-300 text-2xl" />
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