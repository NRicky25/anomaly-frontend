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
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
              <Link
                to="/"
                className="flex items-center space-x-3 p-3 rounded-lg bg-active-link text-highlight font-medium text-xl"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="flex items-center space-x-3 p-3 rounded-lg text-light-gray hover:bg-gray-700 text-xl"
              >
                <TableCellsIcon className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center space-x-3 p-3 rounded-lg text-light-gray hover:bg-gray-700 text-xl"
              >
                <ChartBarIcon className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/uploads"
                className="flex items-center space-x-3 p-3 rounded-lg text-light-gray hover:bg-gray-700 text-xl"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span>Uploads</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Settings Link at the bottom */}
      <a
        href="#"
        className="mt-auto flex items-center space-x-3 p-3 rounded-lg text-light-gray hover:bg-gray-700"
      >
        <Cog6ToothIcon className="h-5 w-5" />
        <span>Settings</span>
      </a>
    </aside>
  );
};

export default Sidebar;
