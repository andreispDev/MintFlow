import { supabase } from "../lib/supabase";

export async function getTasks(projectId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(`*, assigned:assigned_to( full_name )`)
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}

export async function createTask(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();
  if (error) {
    throw error;
  }

  return data;
}

export async function updateTaskStatus(id, status) {
  const { error } = await supabase
    .from("tasks")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteTask(id) {
  await supabase.from("tasks").delete().eq("id", id);
}
