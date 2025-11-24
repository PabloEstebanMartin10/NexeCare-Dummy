// 18. Funcion para crear evento en Google Calendar
  export async function createCalendarEvent() {
    console.log("Creando el evento en tu Google Calendar...");

    // 19. Construimos el OBJETO del evento
    const event = {
      summary: eventName, 
      description: eventDescription,

      // 19.1. Inicio, es un objeto
      start: {
        dateTime: start.toISOString(), // DEBE de ser asi (Google usa cadenas ISO)
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // zona horaria local, importante pq google no lo sabe
      },

      // 19.2. Fin, es un objeto
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      // Peticion a la API de Google Calendar
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

      // actualizar el calendario
      getCalendarEvents();


    } catch (error) {
      console.error("Error al crear evento:", error);
    }
  }