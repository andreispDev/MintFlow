import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function UserModal({ user, onClose }) {
  return (
    <AnimatePresence>
      {user && (
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-[15px] font-semibold text-gray-900">
                User Details
              </h2>

              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-3">
              <p className="text-[13.5px] text-gray-700">
                <strong className="text-gray-900">Name:</strong>{" "}
                {user?.full_name}
              </p>

              <p className="text-[13.5px] text-gray-700">
                <strong className="text-gray-900">Email:</strong> {user?.email}
              </p>

              <p className="text-[13.5px] text-gray-700 capitalize">
                <strong className="text-gray-900">Role:</strong> {user?.role}
              </p>
            </div>

            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-teal-700 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
