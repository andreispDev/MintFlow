import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ open, onClose }) {
  // Hooks must be at the top level
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <p className="text-[15px] font-semibold text-gray-900">Log out</p>

              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5 flex items-start gap-3.5">
              <div className="w-10 h-10 min-w-[40px] rounded-full bg-red-50 flex items-center justify-center">
                <LogOut className="w-[18px] h-[18px] text-red-600" />
              </div>

              <div>
                <p className="text-[13.5px] font-medium text-gray-900">
                  Are you sure you want to log out?
                </p>

                <p className="text-[12.5px] text-gray-500 mt-1">
                  You'll need to sign in again to access your dashboard and
                  monitoring tools.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={onClose}
                className="text-[13px] font-medium text-gray-600 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="text-[13px] font-medium text-white px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              >
                Log out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
