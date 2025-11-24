export async function getCalendarEvents(session, setEvents) {
  try {
    const res = await fetch("/auth/v1/calendar/v3/calendars/primary/events", {
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
    });

    const data = await res.json();

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
