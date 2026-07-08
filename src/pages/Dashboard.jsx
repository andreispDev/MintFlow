import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
// import { getDashboardStats } from "../services/dashboard";
// import { getRecentActivity } from "../services/activity";
import { Users, FolderKanban, ClipboardList, Bot, LayoutDashboard, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    const data = await getDashboardStats();

    setStats(data);

    const activity = await getRecentActivity();

    setActivities(activity);

    setLoading(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
          <span>AI Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal-600 font-medium">Overview</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-[18px] h-[18px] text-teal-600" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              Overview
            </h1>

            <p className="text-[13px] text-gray-500">
              Here's what's happening across your workspace today.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Users"
          value={loading ? "—" : (stats?.users ?? "1,240")}
          icon={<Users className="w-5 h-5" />}
          color="text-blue-600"
        />

        <StatCard
          title="Projects"
          value={loading ? "—" : (stats?.projects ?? "45")}
          icon={<FolderKanban className="w-5 h-5" />}
          color="text-green-600"
        />

        <StatCard
          title="Tasks"
          value={loading ? "—" : (stats?.tasks ?? "320")}
          icon={<ClipboardList className="w-5 h-5" />}
          color="text-purple-600"
        />

        <StatCard
          title="AI Requests"
          value={loading ? "—" : (stats?.aiRequests ?? "8,500")}
          icon={<Bot className="w-5 h-5" />}
          color="text-teal-600"
        />
      </div>

      <RecentActivity activities={activities} />
    </Layout>
  );
}