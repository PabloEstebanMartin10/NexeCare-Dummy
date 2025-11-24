export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / Nombre */}
          <div>
            <h3 className="text-xl font-bold text-white">NexeCare</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Simplificando la vida a quien mas lo necesita
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-2">Enlaces</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Citas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Medicaciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} NexeCare. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
