import { useState } from "react";
import { IoThumbsUp, IoHeart, IoHappy, IoSad } from "react-icons/io5";

const Reactions = ({ postId }) => {
  const [reaction, setReaction] = useState(null);

  const handleReaction = (type) => {
    setReaction(type);
    console.log(`User  reacted to post ${postId} with ${type}`);
  };

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
