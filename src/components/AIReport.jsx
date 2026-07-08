export default function AIReport() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold">AI Report Generator</h2>

      <textarea
        className="border w-full mt-4 p-3"
        placeholder="
        Example:
        Generate a summary of project delays
        and employee workload
        "
      />

      <button
        className="
        bg-purple-600
        text-white
        px-5
        py-2
        rounded
        mt-3
        "
      >
        Generate Report
      </button>
    </div>
  );
}
