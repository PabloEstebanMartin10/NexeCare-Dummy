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
import { createClient } from "@supabase/supabase-js";

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
    </>
  );
}

export default App;

// HAY QUE ACTUALIZAR LA PAGINA FORZOSAMENTE O ALGO SIMILAR PARA QUE EL CALENDARIO SE ACTUALICE AL CREAR EL EVENTO
