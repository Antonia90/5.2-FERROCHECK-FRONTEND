// import { Link } from "react-router-dom";
// import ferroImg from "../images/ferrocheck-home.png";

import { Link } from "react-router-dom";

const requirements = [
  { label: "mujer premenopáusica", mg: 18 },
  { label: "mujer postmenopáusica", mg: 8 },
  { label: "hombre adulto", mg: 8 },
  { label: "embarazada", mg: 27 },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* IZQUIERDA — intro + tabla + aviso */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h1 className="text-3xl font-bold text-iron lowercase">
              bienvenido/a a ferrocheck
            </h1>
            <p className="text-gray-700">
              el hierro es fundamental para transportar oxígeno y mantener la energía diaria.
              esta aplicación te ayuda a estimar tu ingesta y a encontrar ideas de recetas.
            </p>
          </section>

          <section className="card shadow-elevated">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4 lowercase">
                requerimientos diarios de hierro (estimado)
              </h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">categoría</th>
                    <th className="py-2">mg/día</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((r) => (
                    <tr key={r.label} className="border-b last:border-0">
                      <td className="py-2">{r.label}</td>
                      <td className="py-2 font-semibold text-iron">{r.mg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* aviso orientativo pegado a la tabla, en la parte inferior izquierda */}
          <p className="text-xs text-gray-600 lowercase">
            ⚠️ la información es orientativa y puede variar. consultá siempre a un/a profesional de la salud.
          </p>
        </div>

        {/* DERECHA — accesos verticales */}
        <div className="space-y-6">
          <Link to="/recipes" className="block card hover:shadow-lg transition">
            <div className="card-body lowercase">
              <h3 className="font-semibold text-iron mb-1">recetas</h3>
              <p className="text-sm text-gray-600">ideas variadas para comer rico y equilibrado.</p>
            </div>
          </Link>

          <Link to="/ingredients" className="block card hover:shadow-lg transition">
            <div className="card-body lowercase">
              <h3 className="font-semibold text-iron mb-1">ingredientes</h3>
              <p className="text-sm text-gray-600">conocé el hierro estimado de cada alimento.</p>
            </div>
          </Link>

          <Link to="/daily-check" className="block card hover:shadow-lg transition">
            <div className="card-body lowercase">
              <h3 className="font-semibold text-iron mb-1">daily check</h3>
              <p className="text-sm text-gray-600">
                seleccioná recetas y porciones para estimar tu ingesta diaria de hierro.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
