import Layout from "../components/Layout";
import { ChevronRight, ClipboardList } from "lucide-react";

export default function Employee() {
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
          <span>AI Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal-600 font-medium">Tasks</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-[18px] h-[18px] text-teal-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Employee Panel
            </h1>

            <p className="text-[13px] text-gray-500">
              View assigned tasks and updates.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
