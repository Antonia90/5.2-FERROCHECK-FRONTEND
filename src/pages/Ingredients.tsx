import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../api/ingredients";
import type { Ingredient } from "../api/ingredients";

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  ingredient_type: z.enum([
    "verdura",
    "fruta",
    "proteina",
    "lacteo",
    "condimento",
    "otro",
  ]),
  iron_mg_per_100g: z.coerce.number().min(0, "Debe ser mayor o igual a 0"),
});

type FormData = z.infer<typeof schema>;

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Ingredient | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIngredients();
        setIngredients(data);
      } catch {
        setError("No se pudieron cargar los ingredientes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      if (editing) {
        const updated = await updateIngredient(editing.id, data);
        setIngredients((prev) =>
          prev.map((ing) => (ing.id === editing.id ? updated : ing))
        );
        setEditing(null);
      } else {
        const newIng = await createIngredient(data);
        setIngredients((prev) => [...prev, newIng]);
      }
      reset();
    } catch {
      alert("No se pudo guardar el ingrediente");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este ingrediente?")) return;
    try {
      await deleteIngredient(id);
      setIngredients((prev) => prev.filter((ing) => ing.id !== id));
    } catch {
      alert("No se pudo eliminar el ingrediente");
    }
  };

  const handleEdit = (ing: Ingredient) => {
    setEditing(ing);
    reset({
      name: ing.name,
      ingredient_type: ing.ingredient_type,
      iron_mg_per_100g: ing.iron_mg_per_100g,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-iron mb-6 lowercase">
        ingredientes
      </h1>

      <div className="card p-4 rounded-xl shadow-sm border mb-6 bg-white">
        <h2 className="text-lg font-medium text-iron mb-4 lowercase">
          {editing ? "editar ingrediente" : "agregar ingrediente"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">nombre</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-iron outline-none"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">tipo</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-iron outline-none"
              {...register("ingredient_type")}
            >
              <option value="">Seleccionar</option>
              <option value="verdura">Verdura</option>
              <option value="fruta">Fruta</option>
              <option value="proteina">Proteína</option>
              <option value="lacteo">Lácteo</option>
              <option value="condimento">Condimento</option>
              <option value="otro">Otro</option>
            </select>
            {errors.ingredient_type && (
              <p className="text-sm text-red-600 mt-1">
                {errors.ingredient_type.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">hierro (mg/100g)</label>
            <input
              type="number"
              step="0.1"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-iron outline-none"
              {...register("iron_mg_per_100g")}
            />
            {errors.iron_mg_per_100g && (
              <p className="text-sm text-red-600 mt-1">
                {errors.iron_mg_per_100g.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-iron text-white rounded-xl px-4 py-2 hover:opacity-90 lowercase"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "guardando…"
                : editing
                ? "actualizar"
                : "guardar"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  reset();
                }}
                className="btn bg-gray-300 rounded-xl px-4 py-2 lowercase"
              >
                cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p className="p-4 text-center">Cargando ingredientes…</p>
      ) : error ? (
        <p className="p-4 text-center text-red-600">{error}</p>
      ) : ingredients.length === 0 ? (
        <p className="text-center text-gray-600">no hay ingredientes cargados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              className="card p-4 rounded-xl shadow-sm border hover:shadow-md transition bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-iron mb-1 lowercase">
                  {ing.name}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  tipo: {ing.ingredient_type}
                </p>
                <p className="text-sm text-gray-600">
                  hierro: {ing.iron_mg_per_100g} mg/100g
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(ing)}
                  className="px-3 py-1 text-xs rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
                >
                  editar
                </button>
                <button
                  onClick={() => handleDelete(ing.id)}
                  className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                >
                  eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
