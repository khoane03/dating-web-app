import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { IoClose, IoHeart, IoStar, IoArrowRedo, IoRefresh } from "react-icons/io5";

const profiles = [
  { id: 1, name: "Vie, 19", distance: "Cách xa 8 km", image: "/hinh1.png" },
  { id: 2, name: "Anna, 21", distance: "Cách xa 5 km", image: "/hinh2.png" },
  { id: 3, name: "Linh, 22", distance: "Cách xa 3 km", image: "/hinh3.png" },
];

const TinderSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);  // Start from the last profile
  const cardRefs = useRef([]);

  // Handle swipe event (for console logging purposes)
  const swiped = (direction, index) => {
    console.log(`Swiped ${direction} on ${profiles[index].name}`);
  };

  // Function to handle next or previous card on button click
  const handleSwipe = (direction) => {
    if (direction === "right") {
      // Go to the next profile (if available)
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (direction === "left") {
      // Go to the previous profile (if available)
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-96 h-[700px]">
        {profiles.map((profile, index) => (
          <TinderCard
            key={profile.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onSwipe={(dir) => swiped(dir, index)}
            preventSwipe={["up", "down"]}
            className={`absolute w-full h-full ${index === currentIndex ? "" : "hidden"}`}
          >
            <div className="relative w-full h-full bg-black text-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={profile.image}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-[80px] left-4 bg-transparent bg-opacity-50 p-4 rounded-lg">
                <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Gần xung quanh</span>
                <h1 className="text-4xl font-bold">{profile.name}</h1>
                <p className="text-sm">{profile.distance}</p>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                  onClick={() => handleSwipe("left")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoClose className="text-red-500" size={28} />
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoHeart className="text-green-500" size={28} />
                </button>
                <button
                  onClick={() => handleSwipe("up")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoStar className="text-blue-500" size={28} />
                </button>
                <button
                  onClick={() => handleSwipe("down")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoArrowRedo className="text-blue-400" size={28} />
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="p-3 bg-gray-700 rounded-full"
                >
                  <IoRefresh className="text-yellow-500" size={28} />
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default TinderSwipe;
