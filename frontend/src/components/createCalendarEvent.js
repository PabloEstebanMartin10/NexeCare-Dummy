export async function createCalendarEvent(
  session,
  eventName,
  eventDescription,
  start,
  end,
  setEvents
) {
  const event = {
    summary: eventName,
    description: eventDescription,
    start: {
      dateTime: start.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  try {
    const res = await fetch("/auth/v1/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.provider_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const data = await res.json();

    alert("Evento creado, revisa tu Google Calendar!!");

    // Actualizamos el calendario
    getCalendarEvents(session, setEvents);
  } catch (error) {
    console.error("Error al crear evento:", error);
  }
}
