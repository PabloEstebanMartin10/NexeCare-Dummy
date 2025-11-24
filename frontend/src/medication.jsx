import React, { useEffect, useState } from "react";
export default function Medication() {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // nuevo estado para el formulario
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const res = await fetch("/api/medications"); // cambiar ruta cuando exista el backend
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        setMeds(data);
      } catch (e) {
        console.warn("No se pudo cargar desde la API, usando datos mock:", e);
        // Datos de ejemplo mientras no haya base de datos
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

  // ...existing code...
  const toggleTaken = async (id) => {
    // actualización optimista
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "tomado" ? "pendiente" : "tomado" }
          : m
      )
    );

    try {
      // intento de notificar al backend; ajustar método/ruta según tu API
      await fetch(`/api/medications/${id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.warn("No se pudo notificar al servidor:", e);
      // revertir
      setMeds((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, status: m.status === "tomado" ? "pendiente" : "tomado" }
            : m
        )
      );
    }
  };

  // nueva función: añadir medicación
  const addMedication = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);

    // id temporal para UI optimista
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
      // reemplazar temporal por el creado desde el servidor
      setMeds((prev) => prev.map((m) => (m.id === tempId ? created : m)));
    } catch (e) {
      console.warn("No se pudo crear en el servidor, se mantiene en UI:", e);
      // opcional: eliminar el temporal si prefieres
      // setMeds((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setAdding(false);
    }
  };

  // nueva función: eliminar medicación (mejor manejo para caso sin backend)
  const deleteMedication = async (id) => {
    // copia inmutable del estado previo
    const prev = meds.slice();
    // optimista: quitar inmediatamente
    setMeds((p) => p.filter((m) => m.id !== id));

    // Si sabemos que no hay backend (error) o es un id temporal, no llamamos al servidor
    if (error) return;
    if (typeof id === "number" && id < 0) return;

    try {
      const res = await fetch(`/api/medications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      console.warn("No se pudo borrar en el servidor:", e);
      // revertir si falla la petición real
      setMeds(prev);
    }
  };

  if (loading) return <div>Cargando medicación...</div>;

  return (
    <div>
      <h2>Lista de medicación</h2>

      <form
        onSubmit={addMedication}
        style={{ marginBottom: 12, display: "flex", gap: 8 }}
      >
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre de la medicación"
          style={{ flex: 1, padding: 8 }}
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          style={{ padding: "8px 12px" }}
        >
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {meds.map((m) => (
          <li
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <strong>{m.name}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>
                Estado: {m.status}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => toggleTaken(m.id)}
                style={{
                  background: m.status === "tomado" ? "#4caf50" : "#d21919",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
                aria-pressed={m.status === "tomado"}
              >
                Tomado
              </button>

              <button
                onClick={() => deleteMedication(m.id)}
                style={{
                  background: "#999",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
                aria-label={`Eliminar ${m.name}`}
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
