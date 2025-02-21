import React from "react";
import Profile from "./pages/Profile"; // Import Profile.jsx
import IntroducePage from "./pages/IntroducePage/IntroducePage";
import HomePage from "./pages/Home/HomePage";
import 'index.css'
import { Home } from "lucide-react";
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <IntroducePage />

    
    </div>
  );
}

export default App;

