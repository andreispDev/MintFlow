import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function EditProject({ project, onUpdated }) {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setStatus(project.status || "planning");
      setProgress(project.progress || 0);
    }
  }, [project]);

  async function save() {
    setSaving(true);

    const { data, error } = await supabase
      .from("projects")
      .update({
        status,
        progress: Number(progress),
      })
      .eq("id", project.id)
      .select();

    setSaving(false);

    if (error) {
      console.error("Update failed:", error);
      alert(error.message);
      return;
    }

    console.log("Updated:", data);
    onUpdated();
  }

  if (!project) return null;

  return (
    <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 mt-5">
      <h2 className="font-semibold text-[15px] text-gray-900 mb-4">
        Edit Project
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>

        <input
          type="number"
          min="0"
          max="100"
          className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] w-24 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
