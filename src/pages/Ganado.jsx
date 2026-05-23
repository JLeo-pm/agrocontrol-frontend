import { useEffect, useState } from "react";
import {
  getAnimales,
  crearAnimal,
  editarAnimal,
  cambiarEstadoAnimal,
  getPotreros
} from "../services/api";
import { usePagination } from "../hooks/usePagination";


function Ganado() {
  const [animales, setAnimales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [animalEstado, setAnimalEstado] = useState(null);
  const countEstado = (estado) => animales.filter(a => a.estado === estado).length;
  const [nuevoEstado, setNuevoEstado] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [potreros, setPotreros] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    animalId: null,
    numeroArete: "",
    nombre: "",
    sexo: 0,
    raza: "",
    fechaNacimiento: "",
    color: "",
    observaciones: "",
    potreroId: "",
  });

  // ======================
  // LISTAR
  // ======================
  const fetchAnimales = async () => {
    try {
      setLoading(true);
      const data = await getAnimales();
      setAnimales(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const loadPotreros = async () => {
  try {
    const data = await getPotreros();
    setPotreros(data);
  } catch (err) {
    console.error("Error potreros", err);
  }
};
  useEffect(() => {
    fetchAnimales();
    loadPotreros();
  }, []);

  // ======================
  // INPUT
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // CREATE
  // ======================
const create = async () => {
  if (!form.potreroId) {
    alert("Selecciona un potrero");
    return;
  }

  const payload = {
    numeroArete: form.numeroArete,
    nombre: form.nombre,
    sexo: form.sexo === 0 || form.sexo === "0" ? "Macho" : "Hembra",
    raza: form.raza,
    fechaNacimiento: form.fechaNacimiento ? new Date(form.fechaNacimiento) : null,
    color: form.color,
    observaciones: form.observaciones,
    potreroId: form.potreroId ? Number(form.potreroId) : null,
  };

  await crearAnimal(payload);

  setModalOpen(false);
  fetchAnimales();
};

  // ======================
  // UPDATE
  // ======================
const update = async () => {
  const payload = {
    numeroArete: form.numeroArete,
    nombre: form.nombre,
    sexo: form.sexo === 0 || form.sexo === "0" ? "Macho" : "Hembra",
    raza: form.raza,
    fechaNacimiento: form.fechaNacimiento ? new Date(form.fechaNacimiento) : null,
    color: form.color,
    observaciones: form.observaciones,
    potreroId: form.potreroId ? Number(form.potreroId) : null,
  };

  await editarAnimal(form.animalId, payload);

  setModalOpen(false);
  fetchAnimales();
};

  // ======================
  // ESTADO (DELETE LOGICO)
  // ======================
const openEstadoModal = (animal) => {
  setAnimalEstado(animal);
  setNuevoEstado(animal.estado);
  setEstadoModal(true);
};

const saveEstado = async () => {
  await cambiarEstadoAnimal(
    animalEstado.animalId,
    Number(nuevoEstado)
  );

  setEstadoModal(false);
  fetchAnimales();
};

  // ======================
  // MODAL CREATE
  // ======================
  const openCreate = () => {
    setForm({
      animalId: null,
      numeroArete: "",
      nombre: "",
      sexo: 0,
      raza: "",
      fechaNacimiento: "",
      color: "",
      observaciones: "",
      potreroId: "",
    });

    setEditMode(false);
    setModalOpen(true);
  };

  // ======================
  // MODAL EDIT
  // ======================
  const openEdit = (a) => {
    setForm({
      animalId: a.animalId,
      numeroArete: a.numeroArete,
      nombre: a.nombre,
      sexo: a.sexo,
      raza: a.raza,
      fechaNacimiento: a.fechaNacimiento?.split("T")[0] || "",
      color: a.color,
      observaciones: a.observaciones,
      potreroId: a.potreroId,
    });

    setEditMode(true);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMode ? update() : create();
  };

const filtrados = animales.filter(a =>
  `${a.nombre} ${a.numeroArete}`
    .toLowerCase()
    .includes(search.toLowerCase())
);
const {
  page: currentPage,
  totalPages,
  paginated,
  next,
  prev
} = usePagination(filtrados, 6);

console.log({
  header,
  page,
  tableContainer,
  searchInput
});
  return (
  <div style={page}>

    {/* HEADER */}
    <div style={header}>
      <div>
        <h1 style={title}>Gestión de Ganado</h1>
        <p style={subtitle}>
          Administración y control del ganado del rancho
        </p>
      </div>

      <button onClick={openCreate} style={btnPrimary}>
        + Nuevo animal
      </button>
    </div>

    {/* STATS */}
    <div style={statsGrid}>
      <div style={statCard}>
        <span style={statLabel}>Total animales</span>
        <h2 style={statNumber}>{animales.length}</h2>
      </div>

      <div style={statCard}>
    <span style={statLabel}>Activos</span>
    <h2 style={{ ...statNumber, color: "#16a34a" }}>
    {countEstado(0)}
    </h2>
    </div>

    <div style={statCard}>
      <span style={statLabel}>Enfermos</span>
      <h2 style={{ ...statNumber, color: "#f59e0b" }}>
        {countEstado(1)}
      </h2>
    </div>

    <div style={statCard}>
      <span style={statLabel}>Vendidos</span>
      <h2 style={{ ...statNumber, color: "#6366f1" }}>
        {countEstado(2)}
      </h2>
    </div>

    <div style={statCard}>
      <span style={statLabel}>Muertos</span>
      <h2 style={{ ...statNumber, color: "#ef4444" }}>
        {countEstado(3)}
      </h2>
    </div>
{/* HEADER 
    <div style={statCard}>
      <span style={statLabel}>Inactivos</span>
      <h2 style={{ ...statNumber, color: "#64748b" }}>
        {countEstado(4)}
      </h2>
    </div>*/}

    <div style={statCard}>
      <span style={statLabel}>Perdidos</span>
      <h2 style={{ ...statNumber, color: "#0ea5e9" }}>
        {countEstado(5)}
      </h2>
    </div>
    </div>

    {/* TABLE CARD */}
    <div style={tableContainer}>

      <div style={tableHeader}>
        <h3 style={{ margin: 0 }}>Listado de animales</h3>

      <input
        placeholder="Buscar por arete o nombre..."
        style={searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Arete</th>
              <th style={th}>Nombre</th>
              <th style={th}>Raza</th>
              <th style={th}>Potrero</th>
              <th style={th}>Sexo</th>
              <th style={th}>Estado</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((a) => (
              <tr key={a.animalId} style={tr}>

                <td style={td}>
                  <strong>{a.numeroArete}</strong>
                </td>

                <td style={td}>{a.nombre}</td>

                <td style={td}>{a.raza}</td>

                <td style={td}>
                   {a.potreroNombre || "Sin potrero"}
                </td>

                <td style={td}>
                  {a.sexo === "Macho" || a.sexo === 0
                    ? "Macho"
                    : "Hembra"}
                </td>

                <td style={td}>
                  <span
                    style={{
                      ...badge,
                      background:
                        a.estado === 0
                          ? "#dcfce7"
                          : a.estado === 2
                          ? "#fee2e2"
                          : "#e0e7ff",
                      color:
                        a.estado === 0
                          ? "#166534"
                          : a.estado === 2
                          ? "#991b1b"
                          : "#3730a3",
                    }}
                  >
                    {a.estado === 0
                      ? "Activo"
                      : a.estado === 1
                      ? "Enfermo"
                      : a.estado === 2
                      ? "Vendido"
                      : a.estado === 3
                      ? "Muerto"
                      : a.estado === 4
                      ? "Inactivo"
                      : a.estado === 5
                      ? "Perdido"
                      : "Desconocido"}
                  </span>
                </td>

                <td style={td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openEdit(a)}
                      style={btnEdit}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => openEstadoModal(a)}
                      style={btnDelete}
                    >
                      Estado
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    padding: 10,
  }}
>
  <button
    onClick={prev}
    disabled={currentPage === 1}
    style={btnPage}
  >
    ◀
  </button>

  <span style={pageText}>
    Página {currentPage} de {totalPages}
  </span>

  <button
    onClick={next}
    disabled={currentPage === totalPages}
    style={btnPage}
  >
    ▶
  </button>
</div>
    </div>

    {/* MODAL */}
    {modalOpen && (
      <div style={modal}>
        <div style={box}>

          <div style={modalHeader}>
            <h2>
              {editMode ? "Editar animal" : "Nuevo animal"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            style={formGrid}
          >

            <input
              name="numeroArete"
              placeholder="Número arete"
              value={form.numeroArete}
              onChange={handleChange}
              style={input}
            />

            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              style={input}
            />

            <input
              name="raza"
              placeholder="Raza"
              value={form.raza}
              onChange={handleChange}
              style={input}
            />

            <input
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
              style={input}
            />

            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              style={input}
            >
              <option value={0}>Macho</option>
              <option value={1}>Hembra</option>
            </select>

            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              style={input}
            />

            <select
              name="potreroId"
              value={form.potreroId}
              onChange={handleChange}
              style={input}
            >
              <option value="">Seleccionar potrero</option>

              {potreros.map((p) => (
                <option
                  key={p.potreroId}
                  value={p.potreroId}
                >
                  {p.nombre} ({p.tamanoHectareas} ha)
                </option>
              ))}
            </select>

            <textarea
              name="observaciones"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={handleChange}
              style={textarea}
            />

            <div style={modalActions}>
              <button type="submit" style={btnPrimary}>
                Guardar
              </button>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={btnSecondary}
              >
                Cancelar
              </button>
            </div>

          </form>
        </div>
      </div>
      )}

      {/* MODAL ESTADO */}
      {estadoModal && (
        <div style={modal}>
          <div style={estadoBox}>
      
            <h2>Cambiar estado</h2>
      
            <p style={{ color: "#64748b" }}>
              Animal: {animalEstado?.nombre}
            </p>
      
            <select
              value={nuevoEstado}
              onChange={(e) =>
                setNuevoEstado(e.target.value)
              }
              style={input}
            >
              <option value={0}>Activo</option>
              <option value={1}>Enfermo</option>
              <option value={2}>Vendido</option>
              <option value={3}>Muerto</option>
              <option value={4}>Inactivo</option>
              <option value={5}>Perdido</option>
            </select>
            
            <div style={modalActions}>
              <button
                onClick={saveEstado}
                style={btnPrimary}
              >
                Guardar
              </button>
            
              <button
                onClick={() => setEstadoModal(false)}
                style={btnSecondary}
              >
                Cancelar
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   PRO UI STYLES
========================= */

const page = {
  padding: 25,
  background: "#f4f7fb",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 25,
};

const title = {
  margin: 0,
  fontSize: 28,
};

const subtitle = {
  marginTop: 5,
  color: "#64748b",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 20,
  marginBottom: 25,
};

const statCard = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const statLabel = {
  color: "#64748b",
  fontSize: 14,
};

const statNumber = {
  margin: "10px 0 0",
  fontSize: 30,
};

const tableContainer = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
};

const searchInput = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid #dbe2ea",
  width: 250,
};

const th = {
  textAlign: "left",
  padding: 14,
  color: "#64748b",
  fontSize: 14,
  borderBottom: "1px solid #eef2f7",
};

const td = {
  padding: 14,
  borderBottom: "1px solid #eef2f7",
};

const tr = {
  transition: "0.2s",
};

const badge = {
  padding: "6px 12px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

const formGrid = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const modalHeader = {
  marginBottom: 20,
};

const modalActions = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #dbe2ea",
  outline: "none",
};

const textarea = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #dbe2ea",
  minHeight: 100,
  resize: "none",
};

const box = {
  background: "white",
  padding: 25,
  borderRadius: 20,
  width: 500,
};

const btnPrimary = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
};

const btnSecondary = {
  background: "#e2e8f0",
  border: "none",
  padding: "12px 16px",
  borderRadius: 10,
  cursor: "pointer",
};

const btnEdit = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const btnDelete = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};

const modal = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(3px)",
};

const estadoBox = {
  background: "white",
  padding: 25,
  borderRadius: 20,
  width: 350,
};

const btnPage = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #dbe2ea",
  background: "white",
  cursor: "pointer",
  fontSize: 16,
};

const pageText = {
  fontSize: 14,
  color: "#64748b",
  fontWeight: 500,
};

export default Ganado;