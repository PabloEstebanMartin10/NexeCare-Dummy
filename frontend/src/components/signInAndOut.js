  // 9. Funcion para iniciar sesion con Google
  export async function googleSignIn() {
    // Pasamos la funcion en una constante  para manejar errores
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar", // *    **
      },
    });

    // 10. Manejar error
    if (error) {
      alert("Error al iniciar sesion en Google provider con Supabase");
      console.log(error);
    }
  }

  // 11. Funcion para cerrar sesion
  export async function signOut() {
    await supabase.auth.signOut();
  }
