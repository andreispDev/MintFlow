import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://jnkofleikvidfjeoukiy.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_rAQwC4YXFb8yqcDW1dqSgQ_PubfXvQB";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impua29mbGVpa3ZpZGZqZW91a2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDAzMTcsImV4cCI6MjA5OTA3NjMxN30.UH1YmTz_L6IrtgFYnzqUi8IO-8et_x_daYn6VsrVDWU";

export const supabase = createClient(supabaseUrl, supabaseKey, supabaseAnonKey);
