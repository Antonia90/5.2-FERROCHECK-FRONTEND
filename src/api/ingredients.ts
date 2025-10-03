import axios from "axios";
import { useAuthStore } from "../store/auth";

export type Ingredient = {
  id: number;
  name: string;
  iron_mg: number | null;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json" },
});

export async function getIngredients(): Promise<Ingredient[]> {
  const token = useAuthStore.getState().token;
  const res = await api.get("/api/ingredients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
