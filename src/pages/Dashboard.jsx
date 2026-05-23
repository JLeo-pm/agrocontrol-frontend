import { Link, Outlet } from "react-router-dom";

function Dashboard() {

  const year = new Date().getFullYear();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
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
            <Link style={linkStyle} to="potreros">
                Potreros
            </Link>

            <Link style={linkStyle} to="ganado">
                 Ganado
            </Link>
      {/* Comentado 
            <Link style={linkStyle} to="reportes">
              📊 Reportes
            </Link>*/}
          </nav>
        </div>

        {/* FOOTER EMPRESA */}
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
        }}
      >

        {/* TOPBAR */}
        <div
          style={{
            height: "60px",
            background: "white",
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            fontWeight: "bold",
          }}
        >
          Dashboard Ganadero
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
  display: "block",
  color: "white",
  textDecoration: "none",
  marginBottom: "15px",
  fontSize: "18px",
};

export default Dashboard;