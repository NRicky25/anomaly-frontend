import React from "react";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const UserProfile = () => {
  return (
    <div className="flex items-center space-x-3 text-light-gray cursor-pointer">
      <UserCircleIcon className="h-10 w-10 text-gray-400" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">John Doe</span>
        <span className="text-xs">Administrator</span>
      </div>
      <ChevronDownIcon className="h-4 w-4" />
    </div>
  );
};

export default UserProfile;
