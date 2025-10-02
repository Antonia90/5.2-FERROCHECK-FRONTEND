import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const baseLink =
    "hover:text-iron transition-colors lowercase block px-3 py-2 rounded-xl";
  const active =
    "text-iron font-semibold bg-iron-soft";

  return (
    <nav className="bg-white border-b shadow-sm with-bg navbar-bg">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link to="/" className="text-iron font-bold text-xl lowercase">
          ferrocheck
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          <NavLink to="/" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>inicio</NavLink>
          <NavLink to="/advices" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>consejos</NavLink>
          <NavLink to="/iron" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>hierro hemo/no-hemo</NavLink>
          <NavLink to="/symptoms" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>síntomas</NavLink>
          <NavLink to="/recipes" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>recetas</NavLink>
          <NavLink to="/ingredients" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>ingredientes</NavLink>
          <NavLink to="/daily-check" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>control diario</NavLink>
        </div>

        {/* hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-iron-soft"
          onClick={() => setOpen((v) => !v)}
          aria-label="abrir menú"
          aria-expanded={open}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
               viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      <div className={`md:hidden px-4 pb-4 ${open ? "block" : "hidden"}`}>
        <div className="grid gap-1 text-sm bg-white rounded-2xl p-2 shadow-elevated">
          <NavLink onClick={() => setOpen(false)} to="/" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>inicio</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/advices" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>consejos</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/iron" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>hierro hemo/no-hemo</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/symptoms" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>síntomas</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/recipes" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>recetas</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/ingredients" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>ingredientes</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/daily-check" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>control diario</NavLink>
        </div>
      </div>
    </nav>
  );
}

