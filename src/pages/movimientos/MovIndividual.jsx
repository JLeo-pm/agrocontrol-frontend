import { useEffect, useState } from "react";
import { getAnimales, getPotreros, moverAnimal } from "../../services/api";
import {ArrowRightLeft, Beef, MapPinned, FileText, CheckCircle } from "lucide-react";


function MovIndividual() {
  const [animales, setAnimales] = useState([]);
  const [potreros, setPotreros] = useState([]);

  const [animalId, setAnimalId] = useState("");
  const [potreroDestino, setPotreroDestino] = useState("");
  const [motivo, setMotivo] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [a, p] = await Promise.all([
      getAnimales(),
      getPotreros(),
    ]);

    setAnimales(a);
    setPotreros(p);
  };

  const mover = async () => {
    if (!animalId || !potreroDestino) {
      alert("Completa los datos");
      return;
    }

    await moverAnimal(animalId, {
      potreroDestinoId: Number(potreroDestino),
      motivo,
    });

    setSuccess("Animal movido correctamente");

    await load();

    setAnimalId("");
    setPotreroDestino("");
    setMotivo("");
  };

  const animalSeleccionado =
    animales.find(a => a.animalId == animalId);

  return (
    <div style={page}>
      <div style={card}>

        <div style={header}>
          <ArrowRightLeft size={24} />
          <h2 style={{ margin: 0 }}>
            Movimiento Individual de Ganado
          </h2>
        </div>

        <p style={subtitle}>
          Traslada un animal de un potrero a otro registrando el motivo del movimiento.
        </p>

        {success && (
          <div style={successBox}>
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        <div style={formBox}>

          <label style={label}>
            Animal
          </label>

          <select
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            style={input}
          >
            <option value="">
              Seleccionar animal
            </option>

            {animales.map(a => (
              <option
                key={a.animalId}
                value={a.animalId}
              >
                {a.numeroArete} - {a.nombre}
              </option>
            ))}
          </select>

          {animalSeleccionado && (
            <div style={infoCard}>

              <div style={infoRow}>
                <Beef size={18} />
                <span>
                  {animalSeleccionado.nombre}
                </span>
              </div>

              <div style={infoRow}>
                <MapPinned size={18} />
                <span>
                  Potrero actual:
                  {" "}
                  <strong>
                    {animalSeleccionado.potreroNombre || "Sin asignar"}
                  </strong>
                </span>
              </div>

            </div>
          )}

          <label style={label}>
            Potrero destino
          </label>

          <select
            value={potreroDestino}
            onChange={(e) =>
              setPotreroDestino(e.target.value)
            }
            style={input}
          >
            <option value="">
              Seleccionar destino
            </option>

            {potreros.map(p => (
              <option
                key={p.potreroId}
                value={p.potreroId}
              >
                {p.nombre}
              </option>
            ))}
          </select>

          <label style={label}>
            Motivo del movimiento
          </label>

          <div style={inputWrap}>
            <FileText size={18} />
            <input
              placeholder="Ej. Rotación de pastoreo, mantenimiento, aislamiento..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              style={inputNoBorder}
            />
          </div>

          <button
            onClick={mover}
            style={btn}
          >
            <ArrowRightLeft size={18} />
            Mover Animal
          </button>

        </div>
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
const header = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
};

const subtitle = {
  color: "#64748b",
  marginBottom: 25,
};

const label = {
  fontSize: 14,
  fontWeight: 600,
  color: "#334155",
};

const successBox = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: 12,
  borderRadius: 10,
  background: "#dcfce7",
  color: "#166534",
  marginBottom: 20,
};

const infoCard = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 15,
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
};

const inputWrap = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "1px solid #cbd5e1",
  borderRadius: 10,
  padding: "0 12px",
};

const inputNoBorder = {
  flex: 1,
  border: "none",
  outline: "none",
  padding: "12px 0",
};

const card = {
  background: "#fff",
  maxWidth: 750,
  margin: "0 auto",
  padding: 30,
  borderRadius: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

export default MovIndividual;