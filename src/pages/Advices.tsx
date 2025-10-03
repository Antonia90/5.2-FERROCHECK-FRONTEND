export default function Advices() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-iron mb-8 lowercase">
        consejos sobre el hierro
      </h1>

      {/* TIPOS DE HIERRO */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">hierro hemo</h2>
          <p className="text-sm text-gray-700 mb-2">
            Mejor biodisponibilidad (20–30%). Origen animal:
          </p>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Carnes y aves (pollo, vaca, cerdo…)</li>
            <li>Pescado (sardinas, boquerones…)</li>
            <li>Mariscos (almejas, mejillones, gambas…)</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">hierro no hemo</h2>
          <p className="text-sm text-gray-700 mb-2">
            Menor biodisponibilidad (5–10%). Origen vegetal:
          </p>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Legumbres (lentejas, garbanzos, soja, tofu…)</li>
            <li>Cereales integrales y pseudocereales (quinoa, avena…)</li>
            <li>Verduras y frutas (brócoli, tomate, kiwi, espinaca…)</li>
            <li>Frutos secos, semillas y especias</li>
          </ul>
        </div>
      </div>

      {/* ABSORCIÓN */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">favorece la absorción</h2>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Vitamina C (cítricos, tomate, brócoli…)</li>
            <li>Fructosa (frutas, cebolla…)</li>
            <li>Combinar hierro hemo + no hemo</li>
            <li>Ácido cítrico (limón, naranja…)</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">disminuyen la absorción</h2>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Té, café, cacao (taninos y fenoles)</li>
            <li>Lácteos (calcio)</li>
            <li>Fibra en exceso, fitatos y oxalatos</li>
            <li>Refrescos con fosfatos</li>
          </ul>
        </div>
      </div>

      {/* CONSEJOS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">consejos prácticos</h2>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Incluye alimentos ricos en hierro en 2 comidas principales</li>
            <li>Planifica el menú semanal</li>
            <li>Añade frutas u hortalizas ricas en vitamina C</li>
            <li>Evita lácteos en las comidas principales</li>
            <li>Un chorrito de limón potencia la absorción</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">ejemplos de platos</h2>
          <ul className="text-sm list-disc ml-4 space-y-1">
            <li>Garbanzos (no hemo) + pollo (hemo)</li>
            <li>Lentejas + verduras ricas en vitamina C</li>
            <li>Pescado + brócoli o tomate</li>
            <li>Pan integral con tomate o fruta</li>
            <li>Paella con pollo y verduras</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
