import axios from "axios";
import { useAuthStore } from "../store/auth";

export type Ingredient = {
  id: number;
  ingredient_type: "verdura" | "fruta" | "proteina" | "lacteo" | "condimento" | "otro";
  name: string;
  iron_mg_per_100g: number;
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
export async function getIngredients(): Promise<Ingredient[]> {
  const res = await api.get("/api/ingredients", { headers: authHeader() });
  return res.data;
}

// CREATE
export async function createIngredient(data: Omit<Ingredient, "id">) {
  const res = await api.post("/api/ingredients", data, { headers: authHeader() });
  return res.data;
}

// UPDATE
export async function updateIngredient(id: number, data: Omit<Ingredient, "id">) {
  const res = await api.put(`/api/ingredients/${id}`, data, { headers: authHeader() });
  return res.data;
}

// DELETE
export async function deleteIngredient(id: number) {
  await api.delete(`/api/ingredients/${id}`, { headers: authHeader() });
}
