import { useEffect, useState } from "react";
import { getAnimales, getPotreros } from "../services/api";
import { Activity, AlertTriangle, TrendingUp, Map } from "lucide-react";

function Inicio() {
  const [animales, setAnimales] = useState([]);
  const [potreros, setPotreros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const [a, p] = await Promise.all([
        getAnimales(),
        getPotreros(),
      ]);

      setAnimales(a);
      setPotreros(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const countEstado = (estado) =>
    animales.filter((x) => x.estado === estado).length;

  const total = animales.length;

  const activos = countEstado(0);
  const enfermos = countEstado(1);
  const vendidos = countEstado(2);
  const muertos = countEstado(3);
  const perdidos = countEstado(5);

  const salud = total ? Math.round((activos / total) * 100) : 0;

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Panel del Sistema</h1>
          <p style={subtitle}>
            Control total del sistema.
          </p>
        </div>
      </div>

      {loading ? (
        <p>Cargando sistema...</p>
      ) : (
        <>
          {/* KPI GRID */}
          <div style={grid}>

            <Card title="Total Ganado" value={total} color="#111827" />
            <Card title="Activos" value={activos} color="#16a34a" />
            <Card title="Enfermos" value={enfermos} color="#f59e0b" />
            <Card title="Vendidos" value={vendidos} color="#6366f1" />
            <Card title="Muertos" value={muertos} color="#ef4444" />
            <Card title="Potreros" value={potreros.length} color="#0ea5e9" />

          </div>

          {/* HEALTH PANEL */}
          <div style={panel}>
            <h3>Estado general del hato</h3>

            <div style={barContainer}>
              <div
                style={{
                  ...bar,
                  width: `${salud}%`,
                  background:
                    salud > 70
                      ? "#16a34a"
                      : salud > 40
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              />
            </div>

            <p style={{ marginTop: 10, color: "#64748b" }}>
              Salud del hato: <b>{salud}%</b>
            </p>
          </div>

          {/* QUICK INSIGHTS */}
          <div style={grid2}>

          <div style={cardBig}>
            <h3>
              <AlertTriangle size={18} style={{ marginRight: 6 }} />
              Alertas
            </h3>
                        
            <p>
              {enfermos > 0
                ? `${enfermos} animales requieren atención`
                : "Sin alertas activas"}
            </p>
          </div>

          </div>
        </>
      )}
    </div>
  );
}

/* =======================
   COMPONENT CARD
======================= */
function Card({ title, value, color }) {
  return (
    <div style={cardStyle}>
      <p style={{ color: "#64748b", margin: 0 }}>{title}</p>
      <h2 style={{ color, marginTop: 10, fontSize: 28 }}>
        {value}
      </h2>
    </div>
  );
}

/* =======================
   ESTILOS PRO
======================= */

const page = {
  padding: 25,
  background: "#f4f7fb",
  minHeight: "100vh",
};

const header = {
  marginBottom: 20,
};

const title = {
  margin: 0,
  fontSize: 28,
};

const subtitle = {
  marginTop: 5,
  color: "#64748b",
};

/* GRID RESPONSIVE REAL */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 16,
  marginTop: 20,
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 16,
  marginTop: 20,
};

const cardStyle = {
  background: "white",
  padding: 18,
  borderRadius: 16,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const cardBig = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const panel = {
  marginTop: 25,
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const barContainer = {
  width: "100%",
  height: 12,
  background: "#e5e7eb",
  borderRadius: 20,
  overflow: "hidden",
};

const bar = {
  height: "100%",
  borderRadius: 20,
  transition: "0.4s",
};

export default Inicio;