import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe, type Recipe } from "../api/recipes";
import { getIngredients, type Ingredient } from "../api/ingredients";

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().optional(),
  diet_category: z.enum(["vegana", "vegetariana", "omnivora"]),
  base_servings: z.coerce.number().min(1, "Debe ser al menos 1"),
  ingredients: z.array(
    z.object({
      id: z.coerce.number(),
      unit: z.string().min(1),
      quantity_per_serving: z.coerce.number().min(0),
    })
  ).min(1, "Agrega al menos un ingrediente"),
});

type FormData = z.infer<typeof schema>;

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [filter, setFilter] = useState<"all" | "vegana" | "vegetariana" | "omnivora">("all");

    const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors, isSubmitting },
    } = useForm<FormData>({
      resolver: zodResolver(schema) as any,
    });
  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

  // cargar datos
  useEffect(() => {
    const load = async () => {
      const [r, i] = await Promise.all([getRecipes(), getIngredients()]);
      setRecipes(r);
      setIngredients(i);
    };
    load();
  }, []);

  const onSubmit = async (data: FormData) => {
    if (editing) {
      const updated = await updateRecipe(editing.id, data);
      setRecipes((prev) => prev.map((r) => (r.id === editing.id ? updated : r)));
      setEditing(null);
    } else {
      const created = await createRecipe(data);
      setRecipes((prev) => [...prev, created]);
    }
    reset({ name: "", description: "", diet_category: "vegana", base_servings: 1, ingredients: [] });
  };

  const handleEdit = (r: Recipe) => {
    setEditing(r);
    reset({
      name: r.name,
      description: r.description ?? "",
      diet_category: r.diet_category,
      base_servings: r.base_servings,
      ingredients: r.ingredients.map((i) => ({
        id: i.id,
        unit: i.pivot.unit,
        quantity_per_serving: i.pivot.quantity_per_serving,
      })),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar receta?")) return;
    await deleteRecipe(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  // recetas filtradas
  const filtered = filter === "all" ? recipes : recipes.filter((r) => r.diet_category === filter);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FORM 1/3 */}
      <div className="bg-white rounded-2xl shadow p-6 border border-iron-soft">
                {/* FILTROS */}
        <div className="mt-6">
          <h3 className="font-semibold text-orange-700 mb-2 text-xl">filtrar</h3>
          <div className="flex flex-wrap gap-2">
            {["all","vegana","vegetariana","omnivora"].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat as any)}
                className={`px-3 py-1 rounded-xl text-sm border ${
                  filter === cat ? "bg-orange-300 text-white" : "bg-gray-100"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      

        <h2 className="text-xl font-bold text-iron mb-4 lowercase mt-6">
          {editing ? "editar receta" : "nueva receta"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name")} placeholder="nombre" className="w-full rounded-xl border px-3 py-2" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

          <textarea {...register("description")} placeholder="descripción" className="w-full rounded-xl border px-3 py-2" />

          <select {...register("diet_category")} className="w-full rounded-xl border px-3 py-2">
            <option value="vegana">vegana</option>
            <option value="vegetariana">vegetariana</option>
            <option value="omnivora">omnívora</option>
          </select>

          <input type="number" {...register("base_servings")} placeholder="porciones base"
            className="w-full rounded-xl border px-3 py-2" />

          {/* INGREDIENTES DINÁMICOS */}
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">ingredientes</h3>
            {fields.map((f, i) => (
              <div key={f.id} className="flex gap-1 items-center mb-2">
                <select {...register(`ingredients.${i}.id`)} className="flex-1 rounded-xl border px-2 py-1">
                  <option value="">-- ingrediente --</option>
                  {ingredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>{ing.name}</option>
                  ))}
                </select>
                <input {...register(`ingredients.${i}.unit`)} placeholder="unidad" className="w-24 rounded-xl border px-2 py-1" />
                <input type="number" step="0.1" {...register(`ingredients.${i}.quantity_per_serving`)}
                  placeholder="cant." className="w-16 rounded-xl border px-2 py-1" />
                <button type="button" onClick={() => remove(i)} className="text-red-600 hover:text-red-900">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => append({ id: 0, unit: "", quantity_per_serving: 0 })}
              className="text-sm px-3 py-1 bg-orange-100 rounded-xl">+ ingrediente</button>
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full bg-iron text-white py-2 rounded-xl hover:opacity-90">
            {editing ? "actualizar" : "guardar"}
          </button>
        </form>


      </div>

      {/* LISTADO 2/3 */}
      <div className="md:col-span-2 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-600 m-12 font-bold">no hay recetas de la categoría seleccionada</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 items-stretch">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-2xl shadow-2xl flex flex-col h-full">
                <h3 className="text-lg font-bold text-iron mb-1">{r.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{r.description}</p>
                <p className="text-sm">Categoría: <span className="font-medium">{r.diet_category}</span></p>
                <p className="text-sm">Porciones base: {r.base_servings}</p>
                <ul className="list-disc pl-5 mt-2 text-sm">
                  {r.ingredients.map((ing) => (
                    <li key={ing.id}>{ing.name} – {ing.pivot.quantity_per_serving} {ing.pivot.unit}</li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-auto justify-end pt-4">
                  <button onClick={() => handleEdit(r)}
                    className="px-3 py-1 rounded bg-orange-100 text-orange-700 text-xs cursor-pointer">editar</button>
                  <button onClick={() => handleDelete(r.id)}
                    className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs cursor-pointer">eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
