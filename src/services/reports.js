import { supabase } from "../lib/supabase";

export async function getUserReport() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) throw error;

  return data;
}

export async function getProjectReport() {
  const { data, error } = await supabase.from("projects").select(`
*,
profiles:created_by(
full_name
)
`);

  if (error) throw error;

  return data;
}

export async function getTaskReport() {
  const { data, error } = await supabase.from("tasks").select(`
*,
assigned:assigned_to(
full_name
),
projects(
name
)
`);

  if (error) throw error;

  return data;
}
