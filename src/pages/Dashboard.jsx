import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, MapPin, Beef, User, LogOut, ChevronDown  } from "lucide-react";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Detectar móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* OVERLAY (solo móvil) */}
      {menuOpen && isMobile && (
        <div
          onClick={() => setMenuOpen(false)}
          style={overlay}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...sidebar,
          transform: isMobile
            ? menuOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
        }}
      >
        <div>
          <h2>Cabaña el Chúcaro</h2>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              margin: "20px 0",
            }}
          />

          <nav style={{ marginTop: "30px" }}>
          <Link style={linkStyle} to="">
            <Home size={18} style={{ marginRight: 8 }} />
            Inicio
          </Link>

          <Link style={linkStyle} to="potreros">
            <MapPin size={18} style={{ marginRight: 8 }} />
            Potreros
          </Link>

          <Link style={linkStyle} to="ganado">
            <Beef size={18} style={{ marginRight: 8 }} />
            Ganado
          </Link>
          </nav>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "30px",
            fontSize: "13px",
            color: "#94a3b8",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          © {year} Lemara System
        </div>
      </div>

      {/* ZONA DERECHA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: isMobile ? 0 : "240px",
        }}
      >

        {/* TOPBAR */}
          <div style={topbar}>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={hamburger}
          >
            ☰
          </button>

          {/* USER MENU */}
          <div style={{ position: "relative" }}>

            <button
              onClick={() => setUserMenu(!userMenu)}
              style={userButton}
            >
              <div style={avatar}>
                <User size={18} />
              </div>

              <span style={{ fontWeight: 600 }}>
                Administrador
              </span>

              <ChevronDown size={16} />
            </button>

            {userMenu && (
              <div style={dropdown}>
              
                <button
                  onClick={logout}
                  style={dropdownItem}
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
            
              </div>
            )}

          </div>
        </div>

        {/* CONTENIDO */}
        <div
          style={{
            padding: "30px",
            background: "#f1f5f9",
            flex: 1,
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "white",
  textDecoration: "none",
  marginBottom: "15px",
  fontSize: "18px",
};

const sidebar = {
  width: "240px",
  background: "#1e293b",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  transition: "0.3s",
  zIndex: 1000,
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 999,
};

const hamburger = {
  background: "none",
  border: "none",
  fontSize: 24,
  cursor: "pointer",
};

const topbar = {
  height: "60px",
  background: "white",
  borderBottom: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  fontWeight: "bold",
  justifyContent: "space-between",
};

const userButton = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "none",
  background: "white",
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: 12,
};

const avatar = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "#e2e8f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const dropdown = {
  position: "absolute",
  right: 0,
  top: 50,
  background: "white",
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  overflow: "hidden",
  minWidth: 180,
  zIndex: 2000,
};

const dropdownItem = {
  width: "100%",
  border: "none",
  background: "white",
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  fontSize: 14,
};

export default Dashboard;