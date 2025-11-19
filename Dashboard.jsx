//Admin page 
//Admins control and manage the marketplace items and customer acounts.
//customer account: show all users account details here (and show their orders)
//Market place item update , show items 
//search bar
//item add or delete

import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import Nav from "./Nav";
import Card from "./Card_ui";
import { Chart } from "primereact/chart";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [pieData, setPieData] = useState({});
  const [piechartOptions, setpieChartOptions] = useState({});

  /* ---------------- BAR CHART ---------------- */
  useEffect(() => {
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Sales",
          data: [540, 325, 702, 620],
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            gradient.addColorStop(0, "rgba(54,162,235,0.4)");
            gradient.addColorStop(1, "rgba(54,162,235,0.9)");
            return gradient;
          },
          borderColor: "rgba(54,162,235,1)",
          borderWidth: 2,
          borderRadius: 10,
        },
      ],
    };

    const options = {
      plugins: {
        legend: { labels: { color: "#444" } },
      },
      scales: {
        x: { ticks: { color: "#555" }, grid: { display: false } },
        y: { ticks: { color: "#555" } },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  /* ---------------- PIE CHART ---------------- */
  useEffect(() => {
    const data = {
      labels: ["A", "B"],
      datasets: [
        {
          data: [325, 702],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          labels: { color: "#444", usePointStyle: true },
        },
      },
    };

    setPieData(data);
    setpieChartOptions(options);
  }, []);

  /* ---------------- CARD DATA ---------------- */
  const cardData = [
    {
      title: "Orders Completed",
      value: "2.5K",
      icon: "pi pi-cart-plus",
      iconBg: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: "100K",
      icon: "pi pi-users",
      iconBg: "bg-sky-500",
    },
    {
      title: "Revenue Generated",
      value: "$2.5M",
      icon: "pi pi-dollar",
      iconBg: "bg-green-500",
    },
    {
      title: "Sales",
      value: "$5M",
      icon: "pi pi-chart-line",
      iconBg: "bg-orange-500",
    },
  ];

  /* ---------------- SAMPLE DATA FOR TABLES ---------------- */
  const recentOrders = [
    { id: "#1021", customer: "Riddhi", amount: "$250", status: "Delivered" },
    { id: "#1022", customer: "John Doe", amount: "$150", status: "Pending" },
    { id: "#1023", customer: "Priya", amount: "$420", status: "Cancelled" },
    { id: "#1024", customer: "Aman", amount: "$89", status: "Delivered" },
  ];

  const topProducts = [
    { name: "Hoodie", sales: 532 },
    { name: "Sneakers", sales: 413 },
    { name: "T-Shirt", sales: 380 },
    { name: "Jeans", sales: 290 },
  ];

  return (
    <>
      <Nav />

      <div className="flex h-screen bg-gray-100">
        <Sidenav />

        <div className="flex-1 p-10 overflow-auto">
          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cardData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                value={item.value}
                icon={item.icon}
                iconBg={item.iconBg}
              />
            ))}
          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h2 className="font-semibold text-gray-800 text-lg mb-4">
                Sales Data
              </h2>
              <Chart
                type="bar"
                data={chartData}
                options={chartOptions}
                className="w-full h-72"
              />
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h2 className="font-semibold text-gray-800 text-lg mb-4">
                Products Data
              </h2>
              <Chart
                type="pie"
                data={pieData}
                options={piechartOptions}
                className="w-full h-60"
              />
            </div>
          </div>

          {/* NEW ELEMENTS BELOW */}

          {/* ---------------- RECENT ORDERS TABLE ---------------- */}
          <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
            <h2 className="font-semibold text-gray-800 text-lg mb-4">
              Recent Orders
            </h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b text-gray-700">
                    <td className="py-2">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- TOP PRODUCTS + PROGRESS CARDS ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* Top Products */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="font-semibold text-gray-800 text-lg mb-4">
                Top Selling Products
              </h2>

              {topProducts.map((product, i) => (
                <div key={i} className="flex justify-between py-2 border-b">
                  <span>{product.name}</span>
                  <span className="font-semibold">{product.sales} sales</span>
                </div>
              ))}
            </div>

            {/* Performance Stats */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h2 className="font-semibold text-gray-800 text-lg mb-4">
                Performance Stats
              </h2>

              {/* Progress 1 */}
              <p className="text-sm text-gray-600">Storage Usage</p>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
                <div className="w-2/3 bg-blue-500 h-3 rounded-full"></div>
              </div>

              <p className="text-sm text-gray-600">Website Traffic</p>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
                <div className="w-3/4 bg-green-500 h-3 rounded-full"></div>
              </div>

              <p className="text-sm text-gray-600">Server Load</p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="w-1/2 bg-orange-500 h-3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* ---------------- USER ACTIVITY TIMELINE ---------------- */}
          <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
            <h2 className="font-semibold text-gray-800 text-lg mb-4">
              User Activity Timeline
            </h2>

            <ul className="border-l-2 border-blue-500 pl-4">
              <li className="mb-5">
                <strong className="text-blue-600">Riddhi</strong> placed an
                order – <span className="text-gray-500">5 mins ago</span>
              </li>
              <li className="mb-5">
                <strong className="text-blue-600">Aman</strong> registered –{" "}
                <span className="text-gray-500">20 mins ago</span>
              </li>
              <li className="mb-5">
                <strong className="text-blue-600">Priya</strong> added items to
                cart – <span className="text-gray-500">1 hr ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
