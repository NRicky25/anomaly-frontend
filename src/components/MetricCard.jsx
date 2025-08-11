// src/components/MetricCard.jsx
import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const MetricCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-lg flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm 2xl:text-lg font-semibold text-light-gray">
          {title}
        </h3>
        {Icon && <Icon className="h-6 w-6 text-highlight" />}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default MetricCard;
