import { useEffect, useState } from "react";
import { getPotreros, crearPotrero, eliminarPotrero } from "../services/api";

function Potreros() {
  const [potreros, setPotreros] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    potreroId: null,
    nombre: "",
    tamanoHectareas: "",
  });

  // ========================
  // LISTAR
  // ========================
  const fetchPotreros = async () => {
    try {
      setLoading(true);
      const data = await getPotreros();
      setPotreros(data);
    } catch (error) {
      console.error("Error cargando potreros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPotreros();
  }, []);

  // ========================
  // INPUT
  // ========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ========================
  // CREAR
  // ========================
  const create = async () => {
    try {
      await crearPotrero({
        nombre: form.nombre,
        tamanoHectareas: form.tamanoHectareas,
      });

      setModalOpen(false);
      fetchPotreros();
    } catch (error) {
      console.error("Error creando potrero:", error);
    }
  };

  // ========================
  // EDITAR
  // ========================
  const update = async () => {
    try {
      await fetch(`${API_URL}/potreros/${form.potreroId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre: form.nombre,
          tamanoHectareas: form.tamanoHectareas,
        }),
      });

      setModalOpen(false);
      fetchPotreros();
    } catch (error) {
      console.error("Error actualizando potrero:", error);
    }
  };

  // ========================
  // ELIMINAR
  // ========================
  const remove = async (id) => {
    try {
      await eliminarPotrero(id);
      fetchPotreros();
    } catch (error) {
      console.error("Error eliminando potrero:", error);
    }
  };

  const openCreate = () => {
    setForm({ potreroId: null, nombre: "", tamanoHectareas: "" });
    setEditMode(false);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setForm({
      potreroId: p.potreroId,
      nombre: p.nombre,
      tamanoHectareas: p.tamanoHectareas,
    });

    setEditMode(true);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMode ? update() : create();
  };

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>
        <div>
          <h2 style={{ margin: 0 }}>Potreros</h2>
          <p style={{ margin: 0, color: "#64748b" }}>
            Gestión de potreros del sistema
          </p>
        </div>

        <button onClick={openCreate} style={btnPrimary}>
          + Nuevo potrero
        </button>
      </div>

      {/* TABLE */}
      <div style={tableCard}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ ...table, minWidth: 700 }}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Nombre</th>
                <th style={th}>Hectáreas</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {potreros.map((p) => (
                <tr key={p.potreroId}>
                  <td style={td}>{p.potreroId}</td>
                  <td style={{ ...td, fontWeight: "bold" }}>{p.nombre}</td>
                  <td style={td}>{p.tamanoHectareas}</td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={() => openEdit(p)} style={btnEdit}>
                        Editar
                      </button>
                      <button onClick={() => remove(p.potreroId)} style={btnDelete}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div style={modal}>
          <div style={box}>
            <h3>{editMode ? "Editar" : "Crear"} potrero</h3>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                style={input}
              />

              <input
                name="tamanoHectareas"
                placeholder="Hectáreas"
                value={form.tamanoHectareas}
                onChange={handleChange}
                style={input}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button type="submit" style={btnPrimary}>
                  Guardar
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  style={btnSecondary}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   RESPONSIVE PRO + UI BASE
========================= */

const container = {
  padding: 30,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  gap: 15,
  flexWrap: "wrap",
};

const tableCard = {
  background: "white",
  padding: 10,
  borderRadius: 10,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  overflowX: "auto",
};

const btnPrimary = {
  background: "#16a34a",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const btnSecondary = {
  background: "#e2e8f0",
  color: "#1e293b",
  padding: "8px 12px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const btnEdit = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnDelete = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
};

const modal = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 15,
};

const box = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  width: "100%",
  maxWidth: 420,
};

const input = {
  padding: 8,
  border: "1px solid #ddd",
  borderRadius: 6,
  width: "100%",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  minWidth: 600,
};

const th = {
  textAlign: "left",
  padding: "12px 10px",
  borderBottom: "2px solid #e2e8f0",
  color: "#334155",
  fontWeight: "600",
};

const td = {
  padding: "12px 10px",
  borderBottom: "1px solid #e2e8f0",
  verticalAlign: "middle",
};

export default Potreros;