import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/auth";
import iconFe from "../../images/icon-fe.png";
import defaultAvatar from "../../images/default-avatar.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const baseLink =
    "hover:text-iron transition-colors lowercase block px-3 py-2 rounded-xl";
  const active = "text-iron font-semibold bg-iron-soft";

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={iconFe}
            alt="FerroCheck"
            className="w-10 h-10 rounded-lg object-cover shadow-sm"
          />
          <span className="text-iron font-bold text-xl lowercase">
            ferrocheck
          </span>
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            inicio
          </NavLink>
          <NavLink
            to="/advices"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            consejos
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            recetas
          </NavLink>
          <NavLink
            to="/ingredients"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            ingredientes
          </NavLink>
          <NavLink
            to="/daily-check"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            control diario
          </NavLink>

          {/* auth buttons */}
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : ""}`
                }
              >
                iniciar sesión
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : ""}`
                }
              >
                registro
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-iron-soft"
              >
                <span className="text-sm font-medium lowercase">
                  {user?.name}
                </span>
                <img
                  src={defaultAvatar}
                  alt="perfil"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg">
                  <NavLink
                    to="/profile"
                    onClick={() => setOpenMenu(false)}
                    className="block px-4 py-2 text-sm hover:bg-iron-soft rounded-xl"
                  >
                    ver perfil
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-iron-soft"
          onClick={() => setOpen((v) => !v)}
          aria-label="abrir menú"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            {open ? (
              <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      <div className={`md:hidden px-4 pb-4 ${open ? "block" : "hidden"}`}>
        <div className="grid gap-1 text-sm bg-white rounded-2xl p-2 shadow-elevated">
          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            inicio
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/advices"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            consejos
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/recipes"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            recetas
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/ingredients"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            ingredientes
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/daily-check"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : ""}`
            }
          >
            control diario
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                to="/login"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : ""}`
                }
              >
                iniciar sesión
              </NavLink>
              <NavLink
                onClick={() => setOpen(false)}
                to="/register"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : ""}`
                }
              >
                registro
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                to="/profile"
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? active : ""}`
                }
              >
                ver perfil
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
                className="text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
              >
                cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
