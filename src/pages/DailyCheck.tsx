import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { runDailyCheck, type DailyCheckResponse } from "../api/dailyCheck";
import { getRecipes, type Recipe } from "../api/recipes";

const schema = z.object({
  category: z.enum([
    "woman_premenopausal",
    "woman_postmenstrual",
    "man_adult",
    "pregnant",
  ]),
  recipes: z
    .array(
      z.object({
        id: z.coerce.number().min(1, "Selecciona una receta"),
        servings: z.coerce.number().min(1, "Mínimo 1"),
      })
    )
    .min(1, "Agrega al menos una receta"),
});

type FormData = z.infer<typeof schema>;

export default function DailyCheck() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [result, setResult] = useState<DailyCheckResponse | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipes",
  });

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await runDailyCheck(data);
      setResult(res);
    } catch {
      alert("No se pudo calcular el control diario");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-iron mb-6 lowercase">
        control diario
      </h1>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">categoría</label>
            <select
              {...register("category")}
              className="w-full rounded-xl border px-3 py-2 shadow-sm"
            >
              <option value="woman_premenopausal">mujer premenopáusica</option>
              <option value="woman_postmenstrual">mujer postmenstrual</option>
              <option value="man_adult">hombre adulto</option>
              <option value="pregnant">embarazada</option>
            </select>
          </div>

          {/* Recetas dinámicas */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">
              recetas seleccionadas
            </h3>
            {fields.map((f, i) => (
              <div key={f.id} className="flex gap-2 items-center mb-2">
                <select
                  {...register(`recipes.${i}.id`)}
                  className="flex-1 rounded-xl border px-2 py-1"
                >
                  <option value="">-- receta --</option>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="1"
                  min="1"
                  {...register(`recipes.${i}.servings`)}
                  placeholder="porciones"
                  className="w-24 rounded-xl border px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-red-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ id: 0, servings: 1 })}
              className="mt-2 px-3 py-1 bg-orange-100 rounded-xl cursor-pointer"
            >
              + receta
            </button>

            {errors.recipes && (
              <p className="text-sm text-red-600 mt-1">
                {errors.recipes.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-iron text-white py-2 rounded-xl hover:opacity-90 lowercase cursor-pointer"
          >
            {isSubmitting ? "calculando…" : "calcular"}
          </button>
        </form>
      </div>

      {/* RESULTADO */}
      {result && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-iron mb-2">resultado</h2>
          <p className="text-sm text-gray-600 mb-4">{result.message}</p>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Total ingerido:</strong> {result.total_iron_mg} mg
            </li>
            <li>
              <strong>Requerido:</strong> {result.required_mg} mg
            </li>
            <li>
              <strong>Diferencia:</strong> {result.difference_mg} mg
            </li>
            <li>
              <strong>Estado:</strong>{" "}
              {result.status === "sufficient"
                ? "suficiente"
                : result.status === "insufficient"
                ? "insuficiente"
                : result.status}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
