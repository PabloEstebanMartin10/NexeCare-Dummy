// ...existing code...
import React, { useEffect, useState } from "react";

export default function Medication() {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState("");
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
          { id: 1, name: "Aspirina", status: "pendiente" },
          { id: 2, name: "Metformina", status: "tomado" },
          { id: 3, name: "Vitamina D", status: "pendiente" },
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
          ? { ...m, status: m.status === "tomado" ? "pendiente" : "tomado" }
          : m
      )
    );

    try {
      await fetch(`/api/medications/${id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.warn("No se pudo notificar al servidor:", e);
      setMeds((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, status: m.status === "tomado" ? "pendiente" : "tomado" }
            : m
        )
      );
    }
  };

  const addMedication = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);

    const tempId = -Date.now();
    const newMed = { id: tempId, name, status: "pendiente" };
    setMeds((prev) => [newMed, ...prev]);
    setNewName("");

    try {
      const res = await fetch("/api/medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create");

      const created = await res.json();
      setMeds((prev) => prev.map((m) => (m.id === tempId ? created : m)));
    } catch (e) {
      console.warn("No se pudo crear:", e);
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
      console.warn("No se pudo borrar en el servidor:", e);
      setMeds(prev);
    }
  };

  if (loading)
    return <div className="text-center py-6">Cargando medicación...</div>;

  return (
    <aside
      className="
    w-[90%] sm:w-80 md:w-96
    bg-white rounded-xl shadow-lg p-4 
    max-h-[72vh] overflow-auto 
    ml-auto mr-4
    mt-[120px] 
  "
      aria-label="Panel de medicación"
    >
      <h2 className="text-lg font-bold mb-3">Lista de medicación</h2>

      {/* Formulario */}
      <form onSubmit={addMedication} className="flex gap-3 mb-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre de la medicación"
          className="flex-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </form>

      {/* Lista */}
      <ul className="divide-y">
        {meds.map((m) => (
          <li key={m.id} className="flex items-center justify-between py-3">
            <div>
              <strong className="font-medium">{m.name}</strong>
              <div className="text-sm text-gray-500">Estado: {m.status}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleTaken(m.id)}
                className={`px-3 py-2 rounded-lg text-white ${
                  m.status === "tomado" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                Tomado
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
    </aside>
  );
}
