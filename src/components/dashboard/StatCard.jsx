export default function StatCard({
  title,
  value,
  icon,
  color = "text-teal-600",
}) {
  return (
    <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 flex items-center gap-6">
      <span className="text-teal-500 bg-teal-100 p-3 rounded-lg">{icon}</span>

      <div>
        <p className="text-gray-500 text-xs">{title}</p>
        <h2 className={`text-xl font-semibold ${color}`}>{value}</h2>
      </div>
    </div>
  );
}
