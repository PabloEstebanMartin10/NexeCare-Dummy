import { IconHome, IconCalendar, IconUser, IconMessage } from "@tabler/icons-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { supabaseClient, session } = useSessionContext();

  const handleGoogleSignIn = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin } // vuelve a la app
    });
    if (error) console.log("Error al iniciar sesión:", error.message);
  };

  return (
    <div className="h-auto w-full border-b-2 px-5 pb-5 pt-2 border-neutral-300 fixed flex items-center bg-white shadow-md z-9999 top-0">
      
      {/* Logo */}
      <div className="logo_container ml-7">
        <h2 className="font-bold">
          <span className="text-amber-600 text-6xl">Nexe</span>
          <span className="text-gray-600 text-6xl">Care</span>
        </h2>
        <h3 className="text-xs text-neutral-400 font-light">
          <i>Simplificando la vida a quien más lo necesitan.</i>
        </h3>
      </div>

      {/* Enlaces */}
      <div className="flex gap-35 pt-2 ml-auto text-xl items-center text-neutral-600">
        <Link to="/" className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap">
          Home <span className="pl-3"><IconHome /></span>
        </Link>

        <Link to="/agenda" className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap">
          Agenda <span className="pl-3"><IconCalendar /></span>
        </Link>

        <Link to="/chat" className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap">
          Chat <span className="pl-3"><IconMessage /></span>
        </Link>

        {!session ? (
          <a onClick={handleGoogleSignIn} className="mr-10 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap">
            Iniciar Sesión <span className="pl-3"><IconUser /></span>
          </a>
        ) : (
          <span className="mr-10 flex items-center gap-2">
            Hola, {session.user.email}
          </span>
        )}
      </div>
    </div>
  );
}
