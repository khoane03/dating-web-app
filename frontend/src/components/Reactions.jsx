import React, { useState } from "react";
import { IoThumbsUp, IoHeart, IoHappy, IoSad } from "react-icons/io5";

const Reactions = ({ postId, userId }) => {
  const [reaction, setReaction] = useState(null);

  const handleReaction = (type) => {
    setReaction(type);
    console.log(`User ${userId} reacted to post ${postId} with ${type}`);
  };

  return (
    <div className="flex justify-around p-2 bg-gray-800 rounded-lg">
      <button onClick={() => handleReaction("like")} className="text-blue-400">
        <IoThumbsUp size={24} />
      </button>
      <button onClick={() => handleReaction("love")} className="text-red-400">
        <IoHeart size={24} />
      </button>
      <button onClick={() => handleReaction("happy")} className="text-yellow-400">
        <IoHappy size={24} />
      </button>
      <button onClick={() => handleReaction("sad")} className="text-gray-400">
        <IoSad size={24} />
      </button>
    </div>
  );
};

export default Reactions;
