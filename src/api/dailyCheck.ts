import axios from "axios";
import { useAuthStore } from "../store/auth";

export type DailyCheckRequest = {
  recipes: { id: number; servings: number }[];   // 👈 usamos "id"
  category: "woman_premenopausal" | "woman_postmenstrual" | "man_adult" | "pregnant";
};

export type DailyCheckResponse = {
  total_iron_mg: number;
  required_mg: number;
  status: "insufficient" | "sufficient";
  difference_mg: number;
  message: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: "application/json" },
});

function authHeader() {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}` };
}

export async function runDailyCheck(data: DailyCheckRequest): Promise<DailyCheckResponse> {
  const res = await api.post("/api/daily-check", data, { headers: authHeader() });
  return res.data;
}
