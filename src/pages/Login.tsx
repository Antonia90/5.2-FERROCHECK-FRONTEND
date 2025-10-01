import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiLogin } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await apiLogin(data);
      setAuth(res.user, res.token);
      window.location.href = "/";
    } catch (e: any) {
      const msg = e?.response?.data?.message || "No se pudo iniciar sesión.";
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-iron-soft">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <h1 className="text-2xl font-semibold text-iron mb-6">
            Ingresar a FerroCheck
          </h1>

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-iron outline-none"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-iron outline-none"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="w-full btn bg-iron text-white rounded-xl py-2 hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
