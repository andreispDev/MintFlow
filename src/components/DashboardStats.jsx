export default function DashboardStats({ users, projects, tasks }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2>Users</h2>

        <p className="text-3xl font-bold">{users}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2>Projects</h2>

        <p className="text-3xl font-bold">{projects}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2>Tasks</h2>

        <p className="text-3xl font-bold">{tasks}</p>
      </div>
    </div>
  );
}
