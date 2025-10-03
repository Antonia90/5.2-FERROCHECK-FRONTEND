import axios from "axios";
import { useAuthStore } from "../store/auth";
import type { Ingredient } from "./ingredients";

export type RecipeIngredient = {
  id: number; // id del ingrediente
  unit: string;
  quantity_per_serving: number;
};

export type Recipe = {
  id: number;
  name: string;
  description?: string | null;
  diet_category: "vegana" | "vegetariana" | "omnivora";
  base_servings: number;
  ingredients: (Ingredient & { pivot: { unit: string; quantity_per_serving: number } })[];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json" },
});

function authHeader() {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}` };
}

// GET
export async function getRecipes(): Promise<Recipe[]> {
  const res = await api.get("/api/recipes", { headers: authHeader() });
  return res.data;
}

// CREATE
export async function createRecipe(data: Omit<Recipe, "id" | "ingredients"> & { ingredients: RecipeIngredient[] }) {
  const res = await api.post("/api/recipes", data, { headers: authHeader() });
  return res.data;
}

// UPDATE
export async function updateRecipe(id: number, data: Omit<Recipe, "id" | "ingredients"> & { ingredients?: RecipeIngredient[] }) {
  const res = await api.put(`/api/recipes/${id}`, data, { headers: authHeader() });
  return res.data;
}

// DELETE
export async function deleteRecipe(id: number) {
  await api.delete(`/api/recipes/${id}`, { headers: authHeader() });
}
