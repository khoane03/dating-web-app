import { useState } from "react";
import Header from "../header/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sampleData = [
  { id: 1, email: "user1@example.com", phone: "0987654321", status: "Active", role: "Admin" },
  { id: 2, email: "user2@example.com", phone: "0912345678", status: "Inactive", role: "User" },
  { id: 3, email: "user3@example.com", phone: "0976543210", status: "Active", role: "Moderator" },
  { id: 4, email: "user4@example.com", phone: "0967891234", status: "Pending", role: "User" },
  { id: 5, email: "user5@example.com", phone: "0934567890", status: "Active", role: "Admin" },
  { id: 6, email: "user6@example.com", phone: "0981111222", status: "Active", role: "User" },
  { id: 7, email: "user7@example.com", phone: "0972222333", status: "Inactive", role: "Moderator" },
  { id: 8, email: "user8@example.com", phone: "0963333444", status: "Pending", role: "User" },
  { id: 9, email: "user9@example.com", phone: "0954444555", status: "Active", role: "Admin" },
];

const Overview = () => {
  const totalUsers = sampleData.length;

  const statusCounts = sampleData.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {});

  // Dữ liệu biểu đồ dạng ngày giả lập
  const chartData = [
    { day: "Mon", Active: 2, Inactive: 1, Pending: 1 },
    { day: "Tue", Active: 3, Inactive: 1, Pending: 1 },
    { day: "Wed", Active: 4, Inactive: 2, Pending: 1 },
    { day: "Thu", Active: 5, Inactive: 2, Pending: 2 },
    { day: "Fri", Active: 6, Inactive: 2, Pending: 2 },
    { day: "Sat", Active: 6, Inactive: 3, Pending: 2 },
    { day: "Sun", Active: 7, Inactive: 3, Pending: 3 },
  ];

  return (
    <>
      <Header />
      <div className="p-6">
       
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-lg rounded-lg text-center">
            <p className="text-gray-500">Tổng số người dùng</p>
            <h3 className="text-2xl font-bold">{totalUsers}</h3>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg text-center">
            <p className="text-gray-500">Người dùng Active</p>
            <h3 className="text-2xl font-bold">{statusCounts["Active"] || 0}</h3>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg text-center">
            <p className="text-gray-500">Người dùng Pending</p>
            <h3 className="text-2xl font-bold">{statusCounts["Pending"] || 0}</h3>
          </div>
        </div>

       
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Thống kê số lượng người dùng theo ngày</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Active" stroke="#4CAF50" strokeWidth={2} />
              <Line type="monotone" dataKey="Inactive" stroke="#F44336" strokeWidth={2} />
              <Line type="monotone" dataKey="Pending" stroke="#FFC107" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Overview;
