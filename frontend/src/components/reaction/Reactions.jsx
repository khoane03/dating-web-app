import { useEffect } from "react";
import { IoThumbsUp, IoHeart, IoHappy, IoSad } from "react-icons/io5";
import { saveReaction } from "../../service/reactionService";

const Reactions = ({ postId, callTotal }) => {
  const handleReaction = async (type) => {
    try {
      await saveReaction(type, postId); // Lưu phản ứng lên server
      // Gọi callback từ parent để cập nhật total
      if (callTotal) {
        await callTotal(postId); 
      }
    } catch (error) {
      console.error("Lỗi lưu reaction:", error);
    }
  };

  useEffect(() => {
    const fetchReactions = async () => {
      await callTotal(postId); // Lấy tổng số phản ứng khi bài đăng thay đổi
    }
    if (postId) {
      fetchReactions();
    }
  }, [postId]);

  return (
    <div className="flex justify-around p-2 space-x-2 bg-gray-800 rounded-full">
      <button onClick={() => handleReaction("like")} className="text-blue-600 hover:text-blue-200 hover:scale-120 transform transition-transform cursor-pointer">
        <IoThumbsUp size={30} />
      </button>
      <button onClick={() => handleReaction("love")} className="text-pink-600 hover:text-pink-200 hover:scale-120 transform transition-transform cursor-pointer">
        <IoHeart size={30} />
      </button>
      <button onClick={() => handleReaction("happy")} className="text-yellow-600 hover:text-yellow-200 hover:scale-120 transform transition-transform cursor-pointer">
        <IoHappy size={30} />
      </button>
      <button onClick={() => handleReaction("sad")} className="text-red-600 hover:text-red-200 hover:scale-120 transform transition-transform cursor-pointer">
        <IoSad size={30} />
      </button>
    </div>
  );
};

export default Reactions;
