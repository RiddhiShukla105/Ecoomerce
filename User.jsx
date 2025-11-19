import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./User.css";
import { FaBook, FaChartBar, FaDesktop, FaExclamationCircle, FaFileAlt, FaIcons, FaTable, FaUser, FaUserCircle, FaWpforms } from "react-icons/fa";

const barData = [
  { month: "JAN", CHN: 30, USA: 20, UK: 15 },
  { month: "FEB", CHN: 40, USA: 25, UK: 20 },
  { month: "MAR", CHN: 25, USA: 15, UK: 30 },
  { month: "APR", CHN: 35, USA: 20, UK: 25 },
  { month: "MAY", CHN: 20, USA: 30, UK: 15 },
  { month: "JUN", CHN: 45, USA: 40, UK: 35 },
  { month: "JUL", CHN: 30, USA: 25, UK: 20 },
  { month: "AUG", CHN: 40, USA: 30, UK: 25 },
];

const pieData = [
  { name: "Search Engines", value: 40 },
  { name: "Direct Click", value: 30 },
  { name: "Bookmarks Click", value: 30 },
];

const COLORS = ["#00C49F", "#0088FE", "#FF69B4"];

function Users() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
       <aside className="sidebar">
      <h2 className="logo">
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkeaBenulK_m3XY1LL4OZQMbU9qujseC-N5A&s" alt="" className="logo-img" />
 <span>User </span></h2> {/* Dashboard ki jagah Users */}
      <ul>
        <li>Users <FaUser /></li>
        <li>Basic UI Elements <FaDesktop /></li>
        <li>Form Elements <FaWpforms /></li>
        <li>Tables <FaTable /></li>
        <li>Icons <FaIcons /></li>
        <li>Charts <FaChartBar /></li>
        <li>User Pages <FaUserCircle /></li>
        <li>Error Pages <FaExclamationCircle /></li>
        <li>General Pages <FaFileAlt /></li>
        <li>Documentation <FaBook /></li>
      </ul>
    </aside>
  

      {/* Main Content */}
      <main className="content">
        {/* Top Cards */}
        <div className="cards">
          <div className="card pink">
            <h3>Active Users</h3>
            <h1>15,000</h1>
            <p>Increased by 60%</p>
          </div>
          <div className="card blue">
            <h3>New Signups</h3>
            <h1>45,634</h1>
            <p>Decreased by 10%</p>
          </div>
          <div className="card green">
            <h3>Online Users</h3>
            <h1>95,741</h1>
            <p>Increased by 5%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts">
          {/* Bar Chart */}
          <div className="chart-box">
            <h3>User Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="CHN" fill="#FF6384" />
                <Bar dataKey="USA" fill="#8E44AD" />
                <Bar dataKey="UK" fill="#3498DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-box">
            <h3>User Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Users;