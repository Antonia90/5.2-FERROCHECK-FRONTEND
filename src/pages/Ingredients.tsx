import { useEffect, useState } from "react";
import { getIngredients } from "../api/ingredients";
import type { Ingredient } from "../api/ingredients";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIngredients();
        setIngredients(data);
      } catch (err: any) {
        setError("No se pudieron cargar los ingredientes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-4 text-center">Cargando ingredientes…</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-iron mb-6 lowercase">
        ingredientes
      </h1>

      {ingredients.length === 0 ? (
        <p className="text-center text-gray-600">no hay ingredientes cargados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              className="card p-4 rounded-xl shadow-sm border hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-medium text-iron mb-1 lowercase">
                {ing.name}
              </h3>
              <p className="text-sm text-gray-600">
                hierro:{" "}
                {ing.iron_mg !== null ? `${ing.iron_mg} mg` : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
