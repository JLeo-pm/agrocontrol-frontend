import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Potreros from "./pages/Potreros";
import Ganado from "./pages/Ganado";   
import ProtectedRoute from "./routes/ProtectedRoute";
import { useIdleLogout } from "./hooks/useIdleLogout";

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
            <Route path="potreros" element={<Potreros />} />
            <Route path="ganado" element={<Ganado />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;