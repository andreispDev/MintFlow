import { supabase } from "../lib/supabase";

export async function getProjectMembers(projectId) {
  const { data, error } = await supabase
    .from("project_members")
    .select(
      `id, profiles (id, full_name, email)`,
    )
    .eq("project_id", projectId);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name");

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

export async function addMember(projectId, userId) {
  const { error } = await supabase
    .from("project_members")
    .insert({
      project_id: projectId,

      user_id: userId,
    });

  if (error) {
    throw error;
  }
}

export async function removeMember(id) {
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
