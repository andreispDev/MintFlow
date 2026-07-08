import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function EditTask({ task, onUpdated }) {
  const [title, setTitle] = useState(task.title);

  const [priority, setPriority] = useState(task.priority);

  async function save() {
    await supabase
      .from("tasks")
      .update({
        title,
        priority,
      })
      .eq("id", task.id);
    onUpdated();
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-5">
      <h2 className="font-bold text-xl">Edit Task</h2>

      <input
        className="border p-2 rounded w-full mt-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="border p-2 rounded w-full mt-3"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>

        <option value="medium">Medium</option>

        <option value="high">High</option>
      </select>

      <button
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded
        mt-3
        "
        onClick={save}
      >
        Save
      </button>
    </div>
  );
}
