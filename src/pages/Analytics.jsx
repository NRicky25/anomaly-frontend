import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchAnalyticsData } from "../services/api.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (err) {
        console.error("API Call Failed:", err);
        setError("Failed to fetch analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400">Loading analytics...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const transactionData = {
    labels: analyticsData.daily_transactions.map((d) => d.date),
    datasets: [
      {
        label: "Daily Transactions",
        data: analyticsData.daily_transactions.map((d) => d.count),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const fraudRateData = {
    labels: analyticsData.daily_fraud_rate.map((d) => d.date),
    datasets: [
      {
        label: "Daily Fraud Rate (%)",
        data: analyticsData.daily_fraud_rate.map((d) =>
          (d.rate * 100).toFixed(2)
        ),
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true },
    },
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Fraud Analytics</h1>
      <p className="text-gray-400 mb-8">
        Dive deep into the data to identify long-term trends and patterns.
      </p>

      {/* --- Charts Container --- */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Daily Transactions Over Time
          </h2>
          <Line
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { text: "Daily Transactions" },
              },
            }}
            data={transactionData}
          />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Daily Fraud Rate</h2>
          <Line
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { text: "Daily Fraud Rate" },
              },
            }}
            data={fraudRateData}
          />
        </div>
      </div>
    </>
  );
};

export default Analytics;
