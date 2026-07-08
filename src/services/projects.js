import { supabase } from "../lib/supabase";

// Retrieve function
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`*,profiles:created_by(full_name)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

// Create function
export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Update function
export async function updateProject(id, project) {
  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// Delete function
export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
