// src/components/Reports.jsx
import React from "react";

function Reports({ orders = [], products = [] }) {
  // Mock data for Day 6 - Static charts and reports
  const salesData = [
    { date: "2024-01-01", sales: 150000, orders: 12 },
    { date: "2024-01-02", sales: 180000, orders: 15 },
    { date: "2024-01-03", sales: 120000, orders: 8 },
    { date: "2024-01-04", sales: 200000, orders: 18 },
    { date: "2024-01-05", sales: 170000, orders: 14 },
  ];

  const topProducts = [
    { name: "ເບຍລາວ", sales: 45000, quantity: 18 },
    { name: "ລາບປາ", sales: 135000, quantity: 15 },
    { name: "ຕຳໝາກຫຸ່ງ", sales: 90000, quantity: 12 },
    { name: "Heineken", sales: 60000, quantity: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Track your business performance and insights
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-green-600">320,000 LAK</p>
              <p className="text-xs text-green-500 mt-1">
                ↗️ +12% from yesterday
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders Today</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-xs text-blue-500 mt-1">
                ↗️ +8% from yesterday
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order</p>
              <p className="text-2xl font-bold text-purple-600">13,333 LAK</p>
              <p className="text-xs text-purple-500 mt-1">
                ↗️ +3% from yesterday
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Growth</p>
              <p className="text-2xl font-bold text-orange-600">+15.8%</p>
              <p className="text-xs text-orange-500 mt-1">
                ↗️ Better than last week
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart (Mock Visual) */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Sales Trend
            </h3>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          {/* Simple Mock Chart with CSS */}
          <div className="space-y-3">
            {salesData.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 w-20">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2 w-48">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.sales / 200000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {day.sales.toLocaleString()} LAK
                  </div>
                  <div className="text-xs text-gray-500">
                    {day.orders} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Selling Products
            </h3>
            <button className="text-primary-600 text-sm hover:text-primary-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.quantity} units sold
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {product.sales.toLocaleString()} LAK
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Export Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  Order #ORD-001 completed
                </div>
                <div className="text-xs text-gray-500">
                  85,000 LAK • 2 hours ago
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  New order #ORD-002 received
                </div>
                <div className="text-xs text-gray-500">
                  59,000 LAK • 3 hours ago
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  Low stock alert: ປີ້ງແບ້
                </div>
                <div className="text-xs text-gray-500">
                  0 units left • 5 hours ago
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  Order #ORD-003 cancelled
                </div>
                <div className="text-xs text-gray-500">
                  18,000 LAK • 6 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export & Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Export Reports
          </h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Export Excel</span>
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span>Export PDF</span>
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H14"
                />
              </svg>
              <span>Share Report</span>
            </button>

            <hr className="my-4" />

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Generate Custom Report
              </p>
              <button className="text-primary-600 text-sm hover:text-primary-700 font-medium">
                Advanced Options →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
