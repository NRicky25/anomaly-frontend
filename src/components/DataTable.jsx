// src/components/DataTable.jsx
import React from "react";

const DataTable = ({ anomalies, searchQuery, setSearchQuery }) => {
  const filteredAnomalies = anomalies.filter((anomaly) =>
    Object.values(anomaly).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="bg-card rounded-lg xl:h-110 2xl:h-130 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Anomalies</h2>
        <div className="xl:w-1/6">
          <input
            type="text"
            placeholder="Search anomalies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 2xl:text-lg text-left text-xs font-medium text-light-gray uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 2xl:text-lg text-left text-xs font-medium text-light-gray uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 2xl:text-lg text-left text-xs font-medium text-light-gray uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 2xl:text-lg text-left text-xs font-medium text-light-gray uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 2xl:text-lg text-left text-xs font-medium text-light-gray uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredAnomalies.map((anomaly) => (
              <tr key={anomaly.id}>
                <td className="px-6 py-4 2xl:text-lg whitespace-nowrap text-sm font-medium">
                  {anomaly.type}
                </td>
                <td className="px-6 py-4 2xl:text-lg whitespace-nowrap text-sm text-light-gray">
                  {anomaly.user}
                </td>
                <td className="px-6 py-4 2xl:text-lg whitespace-nowrap text-sm text-light-gray">
                  {anomaly.time}
                </td>
                <td className="px-6 py-4 2xl:text-lg whitespace-nowrap text-sm font-medium">
                  ${anomaly.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 2xl:text-lg whitespace-nowrap text-sm">
                  <span
                    className={`px-2 2xl:text-lg inline-flex text-xs leading-5 font-semibold rounded-full ${
                      anomaly.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : anomaly.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {anomaly.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
