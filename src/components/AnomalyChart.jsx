import React from "react";
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
import { Line } from "react-chartjs-2";

// Register the components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnomalyChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#E0E0E0",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Anomalies Over Time",
        color: "#E0E0E0",
        font: {
          size: 13,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#A0A0A0",
          font: {
            size: 14, // Increased font size for x-axis labels
          },
        },
        grid: {
          color: "#2D2D2D",
        },
      },
      y: {
        ticks: {
          color: "#A0A0A0",
          font: {
            size: 14, // Increased font size for x-axis labels
          },
        },
        grid: {
          color: "#2D2D2D",
        },
      },
    },
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg h-96 flex justify-center items-center">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AnomalyChart;
