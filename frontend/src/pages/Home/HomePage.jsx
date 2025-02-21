import { useState } from "react";
import { Send } from "lucide-react";

const HomePage = () => {
 

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">Dating App</h1>
        <nav>
          <button className="bg-transparent hover:underline text-pink-600"></button>
          <button className="border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-600 hover:text-white ml-2">Đăng Xuất</button>
        </nav>
      </header>
    
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r p-4">
       
      </div>

     
      <div className="w-2/3 flex flex-col">
        <div> 
            Surf to matches
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;