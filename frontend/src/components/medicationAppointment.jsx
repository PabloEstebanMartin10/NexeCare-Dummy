import React, { useState, useEffect } from "react";

export default function MedicationAppointment() {
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar citas mock al montar el componente
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Aquí normalmente harías fetch("/api/appointments")
        // Por ahora usamos datos mock
        const data = [
          {
            id: 1,
            name: "Cita con el psicólogo",
            date: "07-11",
            time: "10:00 AM",
          },
          { id: 2, name: "Fisioterapia", date: "10-11", time: "2:00 PM" },
          { id: 3, name: "Logopeda", date: "12-11", time: "4:00 PM" },
        ];
        setAppointments(data);
      } catch (e) {
        console.warn("No se pudieron cargar las citas:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const saveAppointment = (e) => {
    e.preventDefault();
    if (
      !appointmentName.trim() ||
      !appointmentDate.trim() ||
      !appointmentTime.trim()
    )
      return;

    setSaving(true);

    // Creamos cita temporal con id negativo
    const newAppointment = {
      id: -Date.now(),
      name: appointmentName,
      date: appointmentDate,
      time: appointmentTime,
    };

    // Agregamos al estado local
    setAppointments((prev) => [newAppointment, ...prev]);

    // Limpiamos inputs
    setAppointmentName("");
    setAppointmentDate("");
    setAppointmentTime("");
    setSaving(false);
  };

  return (
    <aside
      className="
        w-[90%] sm:w-80 md:w-96
        bg-white rounded-xl shadow-lg p-4 
        mt-[50px]
        ml-auto mr-4
      "
      aria-label="Panel de citas"
    >
      <h2 className="text-lg font-bold mb-3">Añadir cita médica</h2>

      {/* Formulario */}
      <form onSubmit={saveAppointment} className="flex flex-col gap-3 mb-4">
        <input
          value={appointmentName}
          onChange={(e) => setAppointmentName(e.target.value)}
          placeholder="Nombre de la cita"
          className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          placeholder="Fecha (07-11)"
          className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          placeholder="Hora (10:00 AM)"
          className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cita"}
        </button>
      </form>

      {/* Lista de citas */}
      <div className="divide-y">
        {loading && <p className="text-gray-500">Cargando citas...</p>}
        {!loading && appointments.length === 0 && (
          <p className="text-gray-500">No hay citas registradas.</p>
        )}
        {appointments.map((a) => (
          <div key={a.id} className="py-2">
            <strong className="block">{a.name}</strong>
            <span className="text-sm text-gray-500">
              Fecha: {a.date} — Hora: {a.time}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
