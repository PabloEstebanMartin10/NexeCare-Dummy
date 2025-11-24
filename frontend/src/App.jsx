import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
import Medication from "./components/medicationList.jsx";
import MedicationAppointment from "./components/medicationAppointment.jsx";

// ✅ IMPORTANTE: no hay que importar ningún CSS desde @fullcalendar/core ni daygrid ni timegrid
// FullCalendar ya incluye los estilos por defecto para React

const SUPABASE_URL = "https://tmhxuevqpihrsfiaiiaw.supabase.co/";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHh1ZXZxcGlocnNmaWFpaWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTYzNTMsImV4cCI6MjA3OTE3MjM1M30.tQUtE5ATLgWlg3ewBM5fYjvPzpdijgXubcKp7lLHHW0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false },
});

function App() {
  // 14. Creamos el estado para la fecha y hora
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // 16. Creamos los estados para cada dato que queremos enviar a Google Calendar
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // 6. Usamos sesion y cliente
  const session = useSession(); // token de la sesion
  const { isLoading } = useSessionContext(); // estado de carga de la sesion

  // 22. FULLCALENDAR, primero creamos el estado para sacar los eventos de google calendar
  const [events, setEvents] = useState([]);

  // 23. Función para obtener eventos usando el proxy de Vite
  async function getCalendarEvents() {
    try {
      const res = await fetch("/auth/v1/calendar/v3/calendars/primary/events", {
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
      });

      const data = await res.json();

      // Convertimos al formato de FullCalendar
      const fullCalendarEvents = data.items.map((ev) => ({
        title: ev.summary,
        start: ev.start.dateTime || ev.start.date,
        end: ev.end.dateTime || ev.end.date,
      }));

      setEvents(fullCalendarEvents);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  }

  useEffect(() => {
    if (session) {
      getCalendarEvents();
    }
  }, [session]);

  // 12. Si esta cargando le mostramos una app vacia
  if (isLoading) {
    return <></>;
  }

  // COMPONENTE
  // 9. Funcion para iniciar sesion con Google, * el provider es Google y
  async function googleSignIn() {
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
  async function signOut() {
    await supabase.auth.signOut();
  }

  // 18. Funcion para crear evento en Google Calendar
  async function createCalendarEvent() {
    console.log("Creando evento jejeje");

    // 19. Construimos el objeto del evento
    const event = {
      summary: eventName, // titulo
      description: eventDescription,
      // 19.1. Inicio
      start: {
        // es un objeto
        dateTime: start.toISOString(), // DEBE de ser asi (Google usa cadenas ISO)
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // zona horaria local, importante pq google no lo sabe
      },
      // 19.2. Fin
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      // 20. Hacemos la peticion a la API de Google Calendar usando proxy
      const res = await fetch("/auth/v1/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Token de acceso a Google
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await res.json();

      alert("Evento creado, revisa tu Google Calendar!!");

      // 🔄 ACTUALIZAR EL CALENDARIO AUTOMÁTICAMENTE
      getCalendarEvents();
    } catch (error) {
      console.error("Error al crear evento:", error);
    }
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
      <Medication />
      <MedicationAppointment />
    </>
  );
}

export default App;

// HAY QUE ACTUALIZAR LA PAGINA FORZOSAMENTE O ALGO SIMILAR PARA QUE EL CALENDARIO SE ACTUALICE AL CREAR EL EVENTO
