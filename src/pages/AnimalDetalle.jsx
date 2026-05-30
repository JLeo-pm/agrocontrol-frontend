import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getAnimalById, getHistorialEstados, getMovimientosAnimal } from "../services/api";
import {
  Beef,
  Tag,
  HeartPulse,
  Palette,
  MapPinned,
  FileText,
  History,
  ArrowRightLeft,
  Calendar,
} from "lucide-react";

function AnimalDetalle() {
  const { id } = useParams();

  const [animal, setAnimal] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("info");

  useEffect(() => {
    loadAnimal();
  }, []);

  const loadAnimal = async () => {
    try {
      setLoading(true);

      const [
        animalData,
        historialData,
        movimientosData,
      ] = await Promise.all([
        getAnimalById(id),
        getHistorialEstados(id),
        getMovimientosAnimal(id),
      ]);

      setAnimal(animalData);
      setHistorial(historialData);
      setMovimientos(movimientosData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEstado = (estado) => {
    const map = {
      0: "Activo",
      1: "Enfermo",
      2: "Vendido",
      3: "Muerto",
      4: "Inactivo",
      5: "Perdido",
    };

    return map[estado] || "Desconocido";
  };

  if (loading) {
    return (
      <div style={page}>
        <p>Cargando ficha...</p>
      </div>
    );
  }

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={heroCard}>

        <div style={heroTop}>

          <div>
            <h1 style={title}>
              {animal.nombre}
            </h1>

            <p style={subtitle}>
              Arete: {animal.numeroArete}
            </p>
          </div>

          <div style={estadoBadge(animal.estado)}>
            {getEstado(animal.estado)}
          </div>

        </div>

      </div>

      {/* TABS */}
      <div style={tabs}>
        <button
          onClick={() => setTab("info")}
          style={tabBtn(tab === "info")}
        >
          Información
        </button>

        <button
          onClick={() => setTab("historial")}
          style={tabBtn(tab === "historial")}
        >
          Historial
        </button>

        <button
          onClick={() => setTab("mov")}
          style={tabBtn(tab === "mov")}
        >
          Movimientos
        </button>
      </div>

      {/* INFORMACIÓN */}
      {tab === "info" && (
        <>
          <div style={infoGrid}>

            <InfoCard
              icon={<Beef size={18} />}
              title="Raza"
              value={animal.raza}
            />

            <InfoCard
              icon={<HeartPulse size={18} />}
              title="Sexo"
              value={animal.sexo}
            />

            <InfoCard
              icon={<Palette size={18} />}
              title="Color"
              value={animal.color}
            />

            <InfoCard
              icon={<MapPinned size={18} />}
              title="Potrero Actual"
              value={animal.potreroNombre}
            />

          </div>

          <div style={card}>

            <div style={sectionTitle}>
              <FileText size={18} />
              <h3 style={{ margin: 0 }}>
                Observaciones
              </h3>
            </div>

            <p style={{ color: "#475569" }}>
              {animal.observaciones ||
                "Sin observaciones registradas"}
            </p>

          </div>
        </>
      )}

      {/* HISTORIAL */}
      {tab === "historial" && (
        <div style={card}>

          <div style={sectionTitle}>
            <History size={18} />
            <h3 style={{ margin: 0 }}>
              Historial de estados
            </h3>
          </div>

          {historial.length === 0 ? (
            <p>Sin historial registrado</p>
          ) : (
            historial.map((h, i) => (
              <div
                key={i}
                style={timelineItem}
              >

                <div style={timelineDot} />

                <div>

                  <strong>
                    {getEstado(h.estado)}
                  </strong>

                  <p style={date}>
                    {new Date(
                      h.fechaEstado
                    ).toLocaleString()}
                  </p>

                  <p>{h.motivo}</p>

                </div>

              </div>
            ))
          )}

        </div>
      )}

      {/* MOVIMIENTOS */}
      {tab === "mov" && (
        <div style={card}>

          <div style={sectionTitle}>
            <ArrowRightLeft size={18} />
            <h3 style={{ margin: 0 }}>
              Movimientos de potreros
            </h3>
          </div>

          {movimientos.length === 0 ? (
            <p>Sin movimientos registrados</p>
          ) : (
            movimientos.map((m, i) => (
              <div
                key={i}
                style={timelineItem}
              >

                <div style={timelineDot} />

                <div>

                  <strong>
                    {m.potreroOrigen} → {m.potreroDestino}
                  </strong>

                  <p style={date}>
                    {new Date(
                      m.fechaMovimiento
                    ).toLocaleString()}
                  </p>

                  <p>{m.motivo}</p>

                </div>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

/* COMPONENT */
function Info({ label, value }) {
  return (
    <div>
      <small style={{ color: "#64748b" }}>{label}</small>
      <p style={{ margin: 0 }}>{value || "-"}</p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div style={infoCard}>

      <div style={infoHeader}>
        {icon}
        <span>{title}</span>
      </div>

      <h3
        style={{
          marginTop: 12,
          marginBottom: 0,
          color: "#0f172a",
        }}
      >
        {value || "-"}
      </h3>

    </div>
  );
}

/* STYLE PRO */
const page = {
  padding: 16,
  background: "#f4f7fb",
  minHeight: "100vh",
};

const header = {
  marginBottom: 15,
};

const title = {
  margin: 0,
  fontSize: 24,
};

const subtitle = {
  color: "#64748b",
};

const tabs = {
  display: "flex",
  gap: 8,
  marginBottom: 15,
  flexWrap: "wrap",
};

const tabBtn = (active) => ({
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: active ? "#0f172a" : "#e2e8f0",
  color: active ? "white" : "black",
});

const card = {
  background: "white",
  padding: 15,
  borderRadius: 12,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 10,
};

const item = {
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const date = {
  fontSize: 12,
  color: "#64748b",
};

const heroCard = {
  background: "white",
  borderRadius: 20,
  padding: 24,
  marginBottom: 20,
  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
};

const heroTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 15,
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: 16,
  marginBottom: 20,
};

const infoCard = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const infoHeader = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#64748b",
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 20,
};

const timelineItem = {
  display: "flex",
  gap: 15,
  padding: "14px 0",
  borderBottom: "1px solid #e2e8f0",
};

const timelineDot = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "#0f172a",
  marginTop: 6,
};

const estadoBadge = (estado) => ({
  background:
    estado === 0
      ? "#dcfce7"
      : estado === 1
      ? "#fef3c7"
      : estado === 2
      ? "#dbeafe"
      : "#fee2e2",
  color:
    estado === 0
      ? "#166534"
      : estado === 1
      ? "#92400e"
      : estado === 2
      ? "#1e40af"
      : "#991b1b",
  padding: "10px 16px",
  borderRadius: 999,
  fontWeight: 600,
});

export default AnimalDetalle;