import { useState } from "react";
import MovIndividual from "./MovIndividual";

function Movimientos() {
  const [tab, setTab] = useState("individual");

  return (
    <div style={page}>
      <h1 style={title}>Movimientos de Ganado</h1>

      {/* TABS */}
      <div style={tabs}>
        <button onClick={() => setTab("individual")} style={tabBtn(tab === "individual")}>
          Individual
        </button>

        <button onClick={() => setTab("masivo")} style={tabBtn(tab === "masivo")}>
          Masivo
        </button>
      </div>

      {/* CONTENT */}
      <div style={card}>
        {tab === "individual" && <MovIndividual />}
        {tab === "masivo" && <p>Próximamente movimiento masivo</p>}
      </div>
    </div>
  );
}
const page = {
  padding: 20,
  background: "#f4f7fb",
  minHeight: "100vh",
};

const title = {
  fontSize: 26,
  marginBottom: 20,
};

const tabs = {
  display: "flex",
  gap: 10,
  marginBottom: 15,
};

const tabBtn = (active) => ({
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: active ? "#0f172a" : "#e2e8f0",
  color: active ? "white" : "#000",
});

const card = {
  background: "white",
  padding: 20,
  borderRadius: 12,
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const input = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const btn = {
  padding: 10,
  background: "#0f172a",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

export default Movimientos;