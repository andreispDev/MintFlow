import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { createTask } from "../services/tasks";

export default function CreateTask({ projectId, onCreated }) {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase
      .from("project_members")
      .select(
        `
        user_id,
        profiles(
        id,
        full_name
        )
        `,
      )
      .eq("project_id", projectId);
    if (!error) {
      setMembers(data);
    }
  }

  async function submit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      await createTask({
        project_id: projectId,
        title,
        description,
        assigned_to: assignedTo || null,
        priority,
        due_date: dueDate || null,

        status: "todo",
      });

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");
      onCreated();
    } catch (error) {
      console.error("Create task failed:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 mt-6"
    >
      <h2 className="text-[15px] font-semibold text-gray-900 mb-4">
        Create Task
      </h2>

      <input
        required
        className="border border-gray-200 rounded-lg p-2 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border border-gray-200 rounded-lg p-2 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border border-gray-200 rounded-lg p-2 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign employee</option>

        {members.map((member) => (
          <option key={member.user_id} value={member.user_id}>
            {member.profiles.full_name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-200 rounded-lg p-2 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        className="border border-gray-200 rounded-lg p-2 w-full mb-3 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        className="bg-teal-600 text-white px-5 py-2 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={saving}
      >
        {saving ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
