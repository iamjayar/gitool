import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

const assertString = (env: string | boolean) => (typeof env === "string" ? env : "");
const SUPABASE_URL = assertString(import.meta.env.VITE_SUPABASE_URL);
const SUPABASE_KEY = assertString(import.meta.env.VITE_SUPABASE_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const currentUser = writable(supabase.auth.user());
