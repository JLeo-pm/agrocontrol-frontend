import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Potreros from "./pages/Potreros";
import Ganado from "./pages/Ganado";   
import ProtectedRoute from "./routes/ProtectedRoute";
import { useIdleLogout } from "./hooks/useIdleLogout";
import Inicio from "./pages/Inicio";
import AnimalDetalle from "./pages/AnimalDetalle";
import Movimientos from "./pages/movimientos/Movimientos";

function App() {

  useIdleLogout(() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }, 300000);

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD PROTEGIDO */}
        <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Inicio />} />
          <Route path="potreros" element={<Potreros />} />
          <Route path="ganado" element={<Ganado />} />
          <Route path="ganado/:id" element={<AnimalDetalle />} />
          <Route path="movimientos" element={<Movimientos />} />
        </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;