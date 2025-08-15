import React, { useState } from "react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import AnomalyChart from "../components/AnomalyChart";
import UserProfile from "../components/UserProfile";
import {
  WalletIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import useDashboardData from "../hooks/useDashboardData";

const Home = () => {
  const { data, loading, error } = useDashboardData();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <div>Loading Dashboard</div>;
  }
  if (error || !data) {
    return <div>Failed to load dashboard data.</div>;
  }

  const filteredAnomalies = (data.recent_anomalies || []).filter((anomaly) =>
    Object.values(anomaly).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">Dashboard</div>
        <UserProfile />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Anomalies"
          value={data.metrics.total_anomalies}
          icon={ExclamationTriangleIcon}
        />
        <MetricCard
          title="total transactions"
          value={data.metrics.total_transactions}
          icon={UserGroupIcon}
        />
        <MetricCard
          title="Revenue"
          value={`$${data.metrics.revenue}`}
          icon={WalletIcon}
        />
        <MetricCard
          title="Traffic"
          value={`${data.metrics.traffic}`}
          icon={GlobeAltIcon}
        />
      </div>
      <div className="bg-card rounded-lg p-6 shadow-lg mb-8">
        <AnomalyChart chartData={data.chart} />
      </div>
      <DataTable
        anomalies={filteredAnomalies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Home;
