export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-xl shadow-sm shadow-teal-300/40 p-5 mt-6">
      <h2 className="text-md font-bold mb-4 text-gray-900">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No activity yet</p>
      ) : (
        activities.map((item) => (
          <div
            key={item.id}
            className="border-b border-teal-50 py-3 last:border-b-0"
          >
            <p className="text-gray-900">
              {item.profiles?.full_name} {item.action}
            </p>

            <span className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
