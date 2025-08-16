// src/components/Sidebar.jsx
import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg text-xl transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-active-link text-highlight font-medium"
        : "text-light-gray hover:bg-gray-700"
    }`;

  return (
    <aside
      className={`
      fixed inset-y-0 left-0 z-50 w-64 md:w-64 bg-card p-6 flex flex-col justify-between
      transition-transform duration-300 ease-in-out
      transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 md:flex
    `}
    >
      {/* Close button for mobile - visible only on small screens */}
      <div className="flex justify-end md:hidden">
        <button onClick={() => setIsSidebarOpen(false)} className="text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 mb-15">
          <div className="w-8 h-8 bg-highlight rounded-md"></div>
          <span className="text-4xl font-bold">Anomaly</span>
        </div>
        {/* Nav Links */}
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={linkClasses}>
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={linkClasses}>
                <TableCellsIcon className="h-5 w-5" />
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className={linkClasses}>
                <ChartBarIcon className="h-5 w-5" />
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/uploads" className={linkClasses}>
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span>Uploads</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* Settings Link at the bottom */}
      <NavLink
        to="/settings"
        className="mt-auto flex items-center space-x-3 p-3 rounded-lg text-light-gray hover:bg-gray-700"
      >
        <Cog6ToothIcon className="h-5 w-5" />
        <span>Settings</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
