import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LogoutButton from "../LogoutButton";
import { Menu, Search, Bell, HelpCircle, ChevronRight } from "lucide-react";

export default function Navbar({ collapsed, setCollapsed }) {
  const { profile } = useAuth();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-5 gap-3 flex-shrink-0">
      {/* Sidebar Toggle */}
      <button
        onClick={() => setCollapsed?.((v) => !v)}
        className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
        <span>WorkForce</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-900 font-medium">Dashboard</span>
      </div>

      {/* Search */}
      <div className="relative ml-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />

        <input
          type="text"
          placeholder="Search..."
          className="
            h-[34px] w-56 pl-8 pr-3 text-[13px]
            bg-gray-50 border border-gray-200 rounded-lg
            outline-none placeholder:text-gray-400
            focus:border-teal-400 focus:bg-white
            focus:ring-2 focus:ring-teal-500/10
            transition-all
          "
        />
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notification */}
        <button className="relative w-[34px] h-[34px] border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100">
          <Bell className="w-4 h-4" />
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Help */}
        <button className="w-[34px] h-[34px] border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100">
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* User */}
        <div className="flex items-center gap-3">
       
          <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[11px] font-semibold text-teal-600">
            {profile?.full_name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* <LogoutButton /> */}
        </div>
      </div>
    </header>
  );
}
