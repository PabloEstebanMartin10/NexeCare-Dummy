{
  /* Ejemplo de calendario /}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // 🔄
 Aquí se conectan los eventos
      />

      {/ Ejemplo simple de formulario para crear evento */
}
<div style={{ marginTop: "20px" }}>
  <input
    type="text"
    placeholder="Nombre del evento"
    value={eventName}
    onChange={(e) => setEventName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Descripción"
    value={eventDescription}
    onChange={(e) => setEventDescription(e.target.value)}
  />
  <DateTimePicker onChange={setStart} value={start} />
  <DateTimePicker onChange={setEnd} value={end} />
  <button onClick={createCalendarEvent}>Crear Evento</button>
</div>;
