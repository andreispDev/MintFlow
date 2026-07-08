import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  getUserReport,
  getProjectReport,
  getTaskReport,
} from "../services/reports";

import { exportCSV, exportExcel, exportPDF } from "../utils/export";
import {
  ChevronRight,
  FileText,
  FileSpreadsheet,
  FileDown,
} from "lucide-react";

export default function Reports() {
  const [users, setUsers] = useState([]);

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    setUsers(await getUserReport());

    setProjects(await getProjectReport());

    setTasks(await getTaskReport());
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
          <span>AI Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal-600 font-medium">Reports</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
            <FileText className="w-[18px] h-[18px] text-teal-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Reports
            </h1>

            <p className="text-[13px] text-gray-500">
              Export data across users, projects, and tasks.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40">
          <h2 className="font-semibold text-[15px] text-gray-900">Users</h2>

          <p className="text-[13px] text-gray-500 mt-1">
            {users.length} records
          </p>

          <div className="flex gap-2 mt-4">
            <button
              className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportCSV(users, "users-report")}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV
            </button>

            <button
              className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportPDF(users, "users-report")}
            >
              <FileDown className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40">
          <h2 className="font-semibold text-[15px] text-gray-900">Projects</h2>

          <p className="text-[13px] text-gray-500 mt-1">
            {projects.length} records
          </p>

          <div className="flex gap-2 mt-4">
            <button
              className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportExcel(projects, "projects-report")}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Excel
            </button>

            <button
              className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportPDF(projects, "projects-report")}
            >
              <FileDown className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40">
          <h2 className="font-semibold text-[15px] text-gray-900">Tasks</h2>

          <p className="text-[13px] text-gray-500 mt-1">
            {tasks.length} records
          </p>

          <div className="flex gap-2 mt-4">
            <button
              className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportCSV(tasks, "tasks-report")}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV
            </button>

            <button
              className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              onClick={() => exportExcel(tasks, "tasks-report")}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Excel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
