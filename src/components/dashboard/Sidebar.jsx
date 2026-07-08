import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LogoutModal from "../modal/LogoutModal";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  ClipboardList,
  Settings,
  UserCog,
  LogOut,
  Shield,
  Cpu,
} from "lucide-react";

export default function Sidebar({ collapsed = false }) {
  const { profile } = useAuth();
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);

  const role = profile?.role;

  const NAV_SECTIONS = [
    {
      label: "Overview",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/dashboard",
          show: true,
        },
      ],
    },
    {
      label: "Management",
      items: [
        {
          icon: Users,
          label: "Users",
          href: "/users",
          show: role === "admin",
        },
        {
          icon: UserCog,
          label: "Admin",
          href: "/admin",
          show: role === "admin",
        },
        {
          icon: FolderKanban,
          label: "Projects",
          href: "/projects",
          show: role === "admin" || role === "manager",
        },
        {
          icon: FileText,
          label: "Reports",
          href: "/reports",
          show: role === "admin" || role === "manager",
        },
        {
          icon: ClipboardList,
          label: "Tasks",
          href: "/employee",
          show: true,
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          icon: Settings,
          label: "Settings",
          href: "/settings",
          show: true,
        },
      ],
    },
  ];

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 60 : 270 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="flex flex-col bg-white border-r border-teal-100 overflow-hidden shrink-0"
      >
        {/* Logo */}

        <div className="h-14 flex items-center gap-2.5 px-3 border-b border-teal-100 shrink-0">
          <div className="w-8 h-8 min-w-[32px] bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <p className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">
                  WorkForce
                </p>

                <p className="text-[11px] text-gray-500 whitespace-nowrap">
                  Management System
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-2 py-2.5 overflow-y-auto overflow-x-hidden">
          {NAV_SECTIONS.map((section) => {
            const visibleItems = section.items.filter((item) => item.show);

            if (!visibleItems.length) return null;

            return (
              <div key={section.label} className="mb-2">
                {!collapsed && (
                  <p className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest px-2 py-1.5">
                    {section.label}
                  </p>
                )}

                {collapsed && <div className="h-3" />}

                {visibleItems.map(({ icon: Icon, label, href }) => {
                  const active = location.pathname === href;

                  return (
                    <Link
                      key={href}
                      to={href}
                      title={collapsed ? label : undefined}
                      className={`group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors mb-1
                      ${
                        active
                          ? "bg-gradient-to-r from-teal-400 to-teal-600 text-white"
                          : "text-gray-600 hover:bg-teal-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`w-[17px] h-[17px] flex-shrink-0 ${
                          active ? "text-white" : "text-teal-500"
                        }`}
                      />

                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex-1 whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* User */}

        <div className="px-2 py-2.5 border-t border-teal-100">
          <button
            onClick={() => setLogoutModal(true)}
            className="group w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-[11px] font-semibold text-white">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 text-left overflow-hidden"
                >
                  <p className="text-[13px] font-medium text-gray-900 truncate">
                    {profile?.email}
                  </p>

                  <p className="text-[11px] text-gray-500 capitalize">
                    {profile?.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && (
              <LogOut className="w-4 h-4 text-teal-300 group-hover:text-teal-500" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Replace with your own logout modal */}
      <LogoutModal
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
      />
    </>
  );
}
