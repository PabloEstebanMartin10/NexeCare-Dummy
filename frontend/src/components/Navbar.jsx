export default function Navbar() {
  return (
    <>
      {/* Navbar container */}
      <div className="h-auto w-full border-b-2 px-5 pb-5 pt-2 border-neutral-300 fixed flex items-center bg-white shadow-md">

        {/* Logo IZQ */}
        <div className="logo_container">
          <h2 className="font-bold">
            <span className="text-amber-600 text-6xl">Nexe</span>
            <span className="text-gray-600 text-6xl">Care</span>
          </h2>
          <h3 className="text-xs text-neutral-400 font-light">
            <i>Simplificando el día a día de quienes más lo necesitan.</i>
          </h3>
        </div>

        {/* Enlaces DERECHA*/}
        <div className="flex gap-35 pt-2 ml-auto text-xl items-center text-neutral-600">
          <a href="#">Home</a>
          <a href="#">Agenda</a>
          <a href="#" className="mr-10">Iniciar Sesión</a>
        </div>

      </div>
    </>
  );
}
