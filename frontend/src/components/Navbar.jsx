import {
  IconHome,
  IconCalendar,
  IconUser,
  IconMessage,
} from "@tabler/icons-react";
import { googleSignIn } from "../components/signInAndOut";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* Navbar container */}
      <div className="h-auto w-full border-b-2 px-5 pb-5 pt-2 border-neutral-300 fixed flex items-center bg-white shadow-md z-9999 top-0">
        
        {/* Logo IZQ */}
        <div className="logo_container ml-7">
          <h2 className="font-bold">
            <span className="text-amber-600 text-6xl">Nexe</span>
            <span className="text-gray-600 text-6xl">Care</span>
          </h2>
          <h3 className="text-xs text-neutral-400 font-light">
            <i>Simplificando la vida a quien más lo necesitan.</i>
          </h3>
        </div>

        {/* Enlaces DERECHA */}
        <div className="flex gap-35 pt-2 ml-auto text-xl items-center text-neutral-600">

          {/* HOME */}
          <Link
            to="/"
            className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Home
            <span className="pl-3"><IconHome /></span>
          </Link>

          {/* AGENDA */}
          <Link
            to="/agenda"
            className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Agenda
            <span className="pl-3"><IconCalendar /></span>
          </Link>

          {/* CHAT */}
          <Link
            to="/chat"
            className="transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Chat
            <span className="pl-3"><IconMessage /></span>
          </Link>

          {/* LOGIN */}
          <a
            onClick={googleSignIn}
            className="mr-10 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Iniciar Sesión
            <span className="pl-3"><IconUser /></span>
          </a>
        </div>
      </div>
    </>
  );
}
