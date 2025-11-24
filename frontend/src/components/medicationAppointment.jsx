import React, { useEffect, useState } from "react";

export default function Medication() {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const res = await fetch("/api/medications");
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        setMeds(data);
      } catch (e) {
        console.warn("No se pudo cargar desde la API, usando datos mock:", e);
        setMeds([
          {
            id: 1,
            name: "Psicólogo",
            status: "pendiente",
            dia: "07-11",
            hora: "10:00 AM",
          },
          {
            id: 2,
            name: "Fisioterapeuta",
            status: "asistido",
            dia: "10-11",
            hora: "2:00 PM",
          },
          {
            id: 3,
            name: "Logopeda",
            status: "pendiente",
            dia: "12-11",
            hora: "4:00 PM",
          },
        ]);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeds();
  }, []);

  const toggleTaken = async (id) => {
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "asistido" ? "pendiente" : "asistido" }
          : m
      )
    );

    try {
      await fetch(`/api/medications/${id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.warn("No se pudo notificar:", e);
      setMeds((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                status: m.status === "asistido" ? "pendiente" : "asistido",
              }
            : m
        )
      );
    }
  };

  const addMedication = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDate.trim() || !newTime.trim()) return;

    setAdding(true);

    const tempId = -Date.now();
    const newMed = {
      id: tempId,
      name: newName,
      status: "pendiente",
      dia: newDate,
      hora: newTime,
    };

    setMeds((prev) => [newMed, ...prev]);

    setNewName("");
    setNewDate("");
    setNewTime("");

    try {
      const res = await fetch("/api/medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMed),
      });
      if (!res.ok) throw new Error("Failed to create");
      const created = await res.json();

      setMeds((prev) => prev.map((m) => (m.id === tempId ? created : m)));
    } catch (e) {
      console.warn("No se pudo crear en el servidor:", e);
    } finally {
      setAdding(false);
    }
  };

  const deleteMedication = async (id) => {
    const prev = meds.slice();
    setMeds((p) => p.filter((m) => m.id !== id));

    if (error) return;
    if (typeof id === "number" && id < 0) return;

    try {
      const res = await fetch(`/api/medications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      console.warn("No se pudo borrar:", e);
      setMeds(prev);
    }
  };

  if (loading) return <div className="text-center py-6">Cargando citas...</div>;

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Citas Médicas</h2>

      {/* FORMULARIO */}
      <form
        onSubmit={addMedication}
        className="flex flex-col md:flex-row gap-3 mb-4"
      >
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre de la cita"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="Día (07-11)"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          placeholder="Hora (10:00 AM)"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={adding}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </form>

      {/* LISTA */}
      <ul className="divide-y">
        {meds.map((m) => (
          <li key={m.id} className="flex items-center justify-between py-4">
            <div>
              <strong className="font-medium">{m.name}</strong>
              <div className="text-sm text-gray-600">
                Fecha: {m.dia} — Hora: {m.hora}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleTaken(m.id)}
                className={`px-3 py-2 rounded-lg text-white ${
                  m.status === "asistido" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                Asistido
              </button>

              <button
                onClick={() => deleteMedication(m.id)}
                className="px-3 py-2 bg-gray-500 text-white rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
