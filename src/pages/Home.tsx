import { Link } from "react-router-dom";
// import ferroImg from "../images/ferrocheck-home.png";

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
          <section className="space-y-3 my-28">
            <h1 className="text-3xl font-bold text-iron lowercase">
              aumenta tu consumo de hierro
            </h1>
            <p className="text-gray-700 text-2xl w-2/3">
              ferrocheck te ayuda a controlar tu ingesta y a encontrar ideas de
              recetas ricas en hierro.
            </p>
          </section>

          <section className="card w-2/3 shadow-elevated mb-2">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4 lowercase">
                requerimientos estimados de hierro
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
            * la información es orientativa y puede variar.
          </p>
        </div>

        {/* DERECHA — accesos verticales */}
        <div className="flex flex-col items-center gap-24 mt-20">
          <Link
            to="/daily-check"
            className="card hover:shadow-lg transition w-auto max-w-xs"
          >
            <div className="card-body lowercase hover:bg-iron-soft rounded-2xl shadow-xl">
              <h3 className="font-semibold text-iron mb-1">control diario</h3>
              <p className="text-sm text-gray-600">
                selecciona recetas y porciones para estimar tu ingesta diaria de
                hierro.
              </p>
            </div>
          </Link>
          <Link
            to="/recipes"
            className="card hover:shadow-lg transition w-auto max-w-xs"
          >
            <div className="card-body lowercase hover:bg-iron-soft rounded-2xl shadow-xl">
              <h3 className="font-semibold text-iron mb-1">recetas</h3>
              <p className="text-sm text-gray-600">
                ideas variadas para comer rico y equilibrado.
              </p>
            </div>
          </Link>

          <Link
            to="/ingredients"
            className="card hover:shadow-lg transition w-auto max-w-xs"
          >
            <div className="card-body lowercase hover:bg-iron-soft rounded-2xl shadow-xl">
              <h3 className="font-semibold text-iron mb-1">ingredientes</h3>
              <p className="text-sm text-gray-600">
                conoce el hierro estimado de cada alimento.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
