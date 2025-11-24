import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tmhxuevqpihrsfiaiiaw.supabase.co/";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHh1ZXZxcGlocnNmaWFpaWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTYzNTMsImV4cCI6MjA3OTE3MjM1M30.tQUtE5ATLgWlg3ewBM5fYjvPzpdijgXubcKp7lLHHW0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function googleSignIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/calendar",
    },
  });

  if (error) {
    console.error("Error al iniciar sesión con Google:", error);
    alert("Error al iniciar sesión con Google");
  } else {
    console.log("Iniciando sesión con Google...", data);
  }
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.reload(); // refresca para limpiar UI
}

export default supabase;
