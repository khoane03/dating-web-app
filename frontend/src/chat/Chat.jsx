import { useState } from "react";
import { Bell, CheckCircle } from "lucide-react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Bạn có 1 lời mời hẹn hò ❤️", read: false },
    { id: 2, title: "Có người thích bạn! 💖", read: false },
    { id: 3, title: "Tin nhắn mới từ Linh 🌸", read: false },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="relative w-64">
      <div className="relative cursor-pointer">
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="absolute top-8 right-0 w-64 bg-white shadow-lg rounded-md p-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">Không có thông báo nào</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-2 border-b cursor-pointer ${
                notification.read ? "opacity-50" : "hover:bg-gray-100"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm">{notification.title}</p>
                {!notification.read && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
