import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBug, faInfo } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ type, message, duration = 5000, onClose }) => {
    console.log("called");

    const [visible, setVisible] = useState(true);
    console.log(visible);
    // const onClose = () => setVisible(true);
    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            setVisible(false);
            onClose && onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    const alertStyles = {
        success: "bg-green-100 text-green-700 border-green-500",
        error: "bg-red-100 text-red-700 border-red-500",
        info: "bg-blue-100 text-blue-700 border-blue-500",
    };

    const icons = {
        success: <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-700" />,
        error: <FontAwesomeIcon icon={faBug} className="w-5 h-5 text-red-700" />,
        info: <FontAwesomeIcon icon={faInfo} className="w-5 h-5 text-blue-700" />,
    };

    return (
        <div className={`animate-slide-left fixed top-5 right-5 z-50 flex items-center p-3 border-l-4 rounded-md shadow-md ${alertStyles[type]}`}>
            {icons[type]}
            <span className="ml-2">{message}</span>
            <button className="ml-4 text-gray-700 hover:text-gray-900" onClick={() => setVisible(false)}>✖</button>
        </div>
    );
};

export default Alert;
