import { useAuthStore } from "../store/auth";
import ironImg from "../images/ferrocheck-home.png";
import defaultAvatar from "../images/default-avatar.png";

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-iron mb-8 lowercase text-center">
        mi perfil
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* --- LEFT: User info --- */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
          <img
            src={defaultAvatar}
            alt="perfil"
            className="w-28 h-28 rounded-full object-cover shadow mb-4"
          />
          <h2 className="text-xl font-semibold text-iron mb-1 lowercase">
            {user?.name || "usuario"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

          <div className="flex flex-col gap-3 w-full">
            <button
              disabled
              className="w-full bg-orange-200 text-gray-800 py-2 rounded-xl shadow-sm cursor-not-allowed"
              title="feature coming soon"
            >
              mis recetas (próximamente)
            </button>

            <button
              disabled
              className="w-full bg-gray-100 text-gray-500 py-2 rounded-xl shadow-sm cursor-not-allowed"
            >
              editar perfil (en desarrollo)
            </button>
          </div>
        </div>

        {/* --- RIGHT: Calendar or illustration --- */}
        <div className="flex justify-center">
          <img
            src={ironImg}
            alt="calendario"
            className="w-72 h-auto rounded-2xl shadow-md opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
