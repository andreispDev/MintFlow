import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mb-5">
        <ShieldAlert className="w-6 h-6 text-red-600" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900">403</h1>

      <p className="mt-3 text-[14px] text-gray-500 text-center max-w-sm">
        You don't have permission to access this page.
      </p>

      <Link
        className="mt-6 inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 transition-colors"
        to="/dashboard"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
