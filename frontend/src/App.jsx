import { useState, useEffect } from "react";
import "./App.css";

// COMPONENTES
import { getCalendarEvents } from "./components/getCalendarEvents";
import { googleSignIn, signOut } from "./components/signInAndOut";
// 5. Importamos sesion y cliente; y el contexto de la sesión
import { useSession, useSessionContext } from "@supabase/auth-helpers-react";

// 13. Importamos DateTimePicker y useState, para seleccionar fecha y hora
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "./components/Navbar.jsx";
import Medication from "./components/medicationList.jsx";
import MedicationAppointement from "./components/medicationAppointment.jsx";
import Footer from "./components/Footer.jsx";
import { createClient } from "@supabase/supabase-js";
import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";

// React Router Dom+<Routes>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/agenda" element={<App />} />
</Routes>;

// Configuracion de Supabase
const SUPABASE_URL = "https://tmhxuevqpihrsfiaiiaw.supabase.co/";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHh1ZXZxcGlocnNmaWFpaWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTYzNTMsImV4cCI6MjA3OTE3MjM1M30.tQUtE5ATLgWlg3ewBM5fYjvPzpdijgXubcKp7lLHHW0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false },
});

function App() {
  // 1. Estado para la fecha y hora
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // 16. ESTADOS para cada dato que queremos enviar a Google Calendar
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // 22. FULLCALENDAR, primero creamos el estado para sacar los eventos de google calendar
  const [events, setEvents] = useState([]);

  // Token de la sesion, UseEffect para cargar los eventos al iniciar sesion
  const session = useSession();

  useEffect(() => {
    if (session) {
      getCalendarEvents();
    }
  }, [session]);

  // Estado de carga de la sesion; si esta cargando mostramos una app vacia
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  // para ver todo lo que cogemos
  console.log(session);
  console.log(start);
  console.log(end);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <>
      <Navbar />

      {/* Contenedor principal: layout de dos columnas */}
      <div className="flex gap-4 mt-[140px] px-4">
        {/* Columna izquierda: calendario */}
        <div className="flex-2 bg-gray-50 rounded-xl shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true}
            selectable={true}
            height="auto"
          />
        </div>

        {/* Columna derecha: medicación + citas */}
        <div className="flex flex-col gap-4 w-[360px]">
          <Medication />
          <MedicationAppointement />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default App;

// HAY QUE ACTUALIZAR LA PAGINA FORZOSAMENTE O ALGO SIMILAR PARA QUE EL CALENDARIO SE ACTUALICE AL CREAR EL EVENTO
