export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">🌱</span>
          <span className="font-bold text-white">Sembr.ai</span>
        </div>
        <p className="text-sm text-green-300">
          Universidad Popular del Cesar · Ingeniería de Sistemas · Inteligencia Artificial 2026
        </p>
        <p className="text-xs text-green-500 mt-1">
          Datos: SIPSA-DANE & Open-Meteo · Modelos: LSTM + Random Forest
        </p>
      </div>
    </footer>
  )
}
