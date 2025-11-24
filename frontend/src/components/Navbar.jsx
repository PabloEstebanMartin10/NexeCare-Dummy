import {
  IconHome,
  IconCalendar,
  IconUser,
  IconMessage,
} from "@tabler/icons-react";
import { googleSignIn } from "../components/signInAndOut";

export default function Navbar() {
  return (
    <>
      {/* Navbar container */}
      <div className="h-auto w-full border-b-2 px-5 pb-5 pt-2 border-neutral-300 fixed flex items-center bg-white shadow-md z-9999">
        {/* Logo IZQ */}
        <div className="logo_container ml-7">
          <h2 className="font-bold">
            <span className="text-amber-600 text-6xl">Nexe</span>
            <span className="text-gray-600 text-6xl">Care</span>
            <img src=""></img>
          </h2>
          <h3 className="text-xs text-neutral-400 font-light">
            <i>Simplificando la vida a quien más lo necesitan.</i>
          </h3>
        </div>

        {/* Enlaces DERECHA*/}
        <div className="flex gap-35 pt-2 ml-auto text-xl items-center text-neutral-600">
          <a
            href="#"
            className=" transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Home{" "}
            <span className="pl-3">
              <IconHome />
            </span>
          </a>
          <a
            href="#"
            className=" transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Agenda{" "}
            <span className="pl-3">
              <IconCalendar />
            </span>
          </a>
          <a
            href="#"
            className=" transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Chat{" "}
            <span className="pl-3">
              <IconMessage />
            </span>
          </a>
          <a
            href="#"
            onClick={googleSignIn}
            className="mr-10 transform transition-transform duration-200 hover:scale-110 hover:text-blue-400 flex flex-nowrap"
          >
            Iniciar Sesión{" "}
            <span className="pl-3">
              <IconUser />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
