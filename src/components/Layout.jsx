import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-gray">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex flex-col flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="md:hidden px-0 py-2">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Bars3Icon className="h-8 w-8 text-white" />
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
