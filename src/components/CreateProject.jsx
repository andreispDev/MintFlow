import { useState } from "react";
import { createProject } from "../services/projects";
import { useAuth } from "../context/AuthContext";

export default function CreateProject({ onCreated }) {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      await createProject({
        name,
        description,
        created_by: user.id,
        status: "planning",
        priority: "medium",
      });

      setName("");
      setDescription("");
      onCreated();
    } catch (error) {
      console.error("Create project failed:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 mb-6"
    >
      <input
        required
        className="border border-gray-200 rounded-lg p-3 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border border-gray-200 rounded-lg p-3 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-teal-600 text-white px-5 py-2 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={saving}
      >
        {saving ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
