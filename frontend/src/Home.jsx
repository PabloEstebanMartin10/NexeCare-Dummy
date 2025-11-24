import { useState, useEffect } from "react";
import "./App.css";
import veltech from "./img/rmveltechv2.png";
import nexe from "./img/rmcapNexe.png";
import banner from "./img/bannerkids.jpg";
import teamwork from "./img/teamwork.png";

// COMPONENTES
import { getCalendarEvents } from "./components/getCalendarEvents";
import Hero from "./components/Hero";
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
      {/* NAVBAR */}
      <Navbar />
      {/* HERO */}
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="pt-[15vh] h-screen flex items-center justify-center"
      >
        <div className="text-center text-neutral-100">
          <h1 className="text-7xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Bienvenido a NexeCare
          </h1>
          <h3 className="text-3xl mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-neutral-100">
            Cuidamos de los tuyos, contigo.
          </h3>
        </div>
      </div>
      {/* PRESENTACION */}
      {/* 1. Texto */}
      <div className="grid grid-cols-2 px-50 my-30">
        <h2 className="font-bold text-3xl">Una colaboración con propósito</h2>
        <p className="font-light text-xl">
          {" "}
          NexeCare nace de la alianza entre VelTech y la Fundación Nexe,
          combinando tecnología y compromiso social para ofrecer cuidados
          personalizados y de calidad. Juntos trabajamos para mejorar la vida de
          quienes más lo necesitan.
        </p>
      </div>
      {/* 2. Logos */}
      <div className="flex items-center justify-center gap-6 mt-12 bg-neutral-50">
        <img src={veltech} alt="veltech" className="w-66 h-66 object-contain" />
        <span className="text-2xl ">+</span>
        <img
          src={nexe}
          alt="nexefundacion"
          className="w-66 h-66 object-contain"
        />
      </div>
      {/* 2. Texto */}
      <div className=" px-50 my-30 grid grid-cols-2">
        <img
          src={teamwork}
          alt="teamwork"
          className="w-55 h-55 animate-spin ml-60"
        />
        <div>
          <h2 className="font-bold text-3xl pb-10">
            Cuidando con tecnología y corazón
          </h2>
          <p className="font-light text-xl">
            {" "}
            Somos una plataforma innovadora diseñada para facilitar el control
            de la medicación y el cuidado diario de niños con pluridiscapacidad.
            <br />
          </p>
        </div>
      </div>
      <div className="text-center italic text-xl font-light py-10 px-90 bg-neutral-100">
        “Gracias a nuestra tecnología intuitiva, los padres y cuidadores pueden
        gestionar con seguridad y eficiencia las rutinas médicas, reduciendo
        errores y ganando tranquilidad.”
      </div>
    </>
  );
}

export default App;

// HAY QUE ACTUALIZAR LA PAGINA FORZOSAMENTE O ALGO SIMILAR PARA QUE EL CALENDARIO SE ACTUALICE AL CREAR EL EVENTO
