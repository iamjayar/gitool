import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

const assertString = (env: string | boolean) => {
  return typeof env === "string" ? env : "";
};

const SUPABASE_URL = assertString(import.meta.env.VITE_SUPABASE_URL);
const SUPABASE_KEY = assertString(import.meta.env.VITE_SUPABASE_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const currentUser = writable(supabase.auth.user());

export const signUp = async (email: string, password: string) => {
  let { error } = await supabase.auth.signUp({ email, password });
  return error;
};

export const signIn = async (email: string, password: string) => {
  let { user, error } = await supabase.auth.signIn({ email, password });
  if (error) return error;
  currentUser.set(user);
};

export const signOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) return error;
  currentUser.set(null);
};

export const get = async (table: string, columns: string = "*") => {
  let { data, error } = await supabase.from(table).select(columns);
  return { data, error };
};

export const post = async (table: string, body: object) => {
  let { error } = await supabase.from(table).upsert(
    {
      user_id: supabase.auth.user().id,
      ...body,
    },
    {
      onConflict: "user_id",
    }
  );

  return error;
};
