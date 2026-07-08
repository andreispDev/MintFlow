import { supabase } from "../lib/supabase";

export async function getRecentActivity() {
  const { data, error } = await supabase
    .from("activity_logs")
    .select(`*,profiles (full_name)`)

    .order("created_at", {
      ascending: false,
    })

    .limit(5);

  if (error) {
    console.log(error);

    return [];
  }

  return data;
}
