import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/Navbar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar collapsed={collapsed} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
