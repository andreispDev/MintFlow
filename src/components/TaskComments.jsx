import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TaskComments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase

      .from("task_comments")
      .select(
        `
        *,
        profiles(
        full_name
        )
        `,
      )
      .eq("task_id", taskId);
    setComments(data || []);
  }

  async function add() {
    await supabase
      .from("task_comments")
      .insert({
        task_id: taskId,
        comment: text,
      });
    setText("");
    load();
  }

  return (
    <div>
      <h3 className="font-bold">Comments</h3>

      <input
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
        onClick={add}
      >
        Add
      </button>

      {comments.map((c) => (
        <p key={c.id} className="mt-3">
          <b>{c.profiles?.full_name}</b>:{c.comment}
        </p>
      ))}
    </div>
  );
}
