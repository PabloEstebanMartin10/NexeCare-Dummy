export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo */}
          <div>
            <h3 className="text-2xl font-bold text-white">NexeCare</h3>
            <p className="text-gray-400 mt-2 text-md">
              Simplificando la vida a quien mas lo necesita
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-2 text-2xl">Enlaces</h4>
            <ul className="space-y-1 text-xl font-extralight">
              <li>
                <a href="#" className="hover:text-white pb-10">Inicio</a>
              </li>
              <li>
                <a href="#" className="hover:text-white pb-10">Citas</a>
              </li>
              <li>
                <a href="#" className="hover:text-white pb-10">Medicaciones</a>
              </li>
              <li>
                <a href="#" className="hover:text-white pb-10">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Mapa */}
          <div className="w-full h-48 md:h-64 lg:h-72">
            <h4 className="text-white font-semibold mb-2 text-2xl">¿Dónde estamos?</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5984.583195688264!2d2.155368676303254!3d41.4111883712969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2ba651850d9%3A0x237d1d4b9cb6b253!2sNexe%20Fundaci%C3%B3!5e0!3m2!1ses!2ses!4v1763994437036!5m2!1ses!2ses"
              className="w-full h-full border-0 rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-700 mt-20 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} NexeCare. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
