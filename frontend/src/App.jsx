import { useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { usePortalData } from "./usePortalData";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Academic from "./pages/Academic";
import About from "./pages/About";
import Login from "./pages/Login";

const rollNumber = "24UADS1047";
const sessionKey = "portal.demo.signed-in";

function Workspace({ onLogout }) {
  const studentResource = usePortalData(`${rollNumber}/student`);
  const portalData = {
    rollNumber,
    studentName: "Shabbir Khan",
    studentResource,
  };
  return (
    <div className="app-shell">
      <header className="navbar">
        <NavLink to="/" className="brand" aria-label="Student Portal home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>{" "}
          Student Portal
        </NavLink>
        <nav aria-label="Main navigation">
          {[
            ["/", "Overview"],
            ["/academic", "Subjects"],
            ["/student", "Profile"],
            ["/about", "About"],
          ].map(([path, label]) => (
            <NavLink end key={path} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="quiet signout" onClick={onLogout}>
          Sign out
        </button>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home portalData={portalData} />} />
          <Route
            path="/academic"
            element={<Academic portalData={portalData} />}
          />
          <Route
            path="/student"
            element={<Student portalData={portalData} />}
          />
          <Route path="/about" element={<About portalData={portalData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        Student Portal{" "}
        <span>
          Roll {rollNumber} · {portalData.studentName}
        </span>
      </footer>
    </div>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(
    () => sessionStorage.getItem(sessionKey) === "yes",
  );
  function enter() {
    sessionStorage.setItem(sessionKey, "yes");
    setSignedIn(true);
  }
  function leave() {
    sessionStorage.removeItem(sessionKey);
    setSignedIn(false);
  }
  return signedIn ? (
    <Workspace onLogout={leave} />
  ) : (
    <Login onEnter={enter} rollNumber={rollNumber} />
  );
}
